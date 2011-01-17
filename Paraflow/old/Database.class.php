<?php

	class Database {
		private static $instance;
		private $dbHandle, $user, $host, $password, $database;

		private function __construct() {
			// Get the usercredentials for the database server
			require_once("Database.conf.php");
			$this->host 	= $databaseCredentials['host'];
			$this->user 	= $databaseCredentials['user'];
			$this->password	= $databaseCredentials['password'];
			$this->database	= $databaseCredentials['database'];

			// Make create database connection
			$this->dbHandle = new mysqli($this->host, $this->user, $this->password, $this->database);
			$this->dbHandle->set_charset("utf8"); // Set encoding to UTF-8
		}

		public static function getInstance() {
			if(!self::$instance) {
				self::$instance = new Database();
			}
			return self::$instance;
		}

		public function close() {
			if(self::$instance) {
				$this->dbHandle->close(); //close mysqi connection
			}
			self::$instance = NULL; //nullify the instance
		}

		public function preparedQuery($query, $parameters = array(), $types = "", $debug = false) {

			$result_set = array();
			//$types = str_split($types);
			$this->stmt = $this->dbHandle->prepare($query);
			
			if($debug) {
				print_r($parameters);
				print_r($types);
				echo "<br />".$query;
			}
			// If there are parameters to bind
			if(!empty($parameters) && !empty($types)) {
				$array = array();
				//PHP 5.3 requires parameters to be references
				for ($i = 0; $i < count($parameters); $i++) {
					$array[] = &$parameters[$i];
				}
				call_user_func_array('mysqli_stmt_bind_param',  array_merge( array($this->stmt, $types), $array));
			}
			
			$this->stmt->execute();
			
			$result_set = $this->getResult();
			
			$this->stmt->close();

			return $result_set;
		}
		
		private function getResult() {
			

			$result = array();

			// $row is a reference to the current row, if we don't copy the row
			// like below all fields in $rows will have the same value, the one
			// of the last row. A rewrite of stmt_bind_assoc to make it possible
			// to just type $rows[] = $row; would be great.

			$rows = array();
			if ($this->stmt_bind_assoc($row)) {
				while($this->stmt->fetch()) {
					$copied_row = array();	
					
					foreach($row as $key => $value) {
						$copied_row[$key] = $value;
					}
					$rows[] = $copied_row;
				}
			}
			
			$result['rows'] = $rows;
			$result['insertId'] = $this->stmt->insert_id;
			$result['affectedRows'] = $this->stmt->affected_rows;
			$result['error'] = $this->stmt->error;
				
			return $result;
		}

		// stmt_bind_assoc function taken from php.net comment with an if($data) statement added
		// to handle warnings if the query is of ex UPDATE type or some thing else that does not
		// return a resultset.
		private function stmt_bind_assoc(&$out) {
			$data = mysqli_stmt_result_metadata($this->stmt);

			if ($data) {
				$fields = array();
				$out 	= array();

				$fields[0] = $this->stmt;
				$count = 1;

				while($field = mysqli_fetch_field($data)) {
					$fields[$count] = &$out[$field->name];
					$count++;
				}   
				call_user_func_array("mysqli_stmt_bind_result", $fields);

				return true;
			}
			else {
				return false;
			}
		}
		
		public function secure($string) {
			return $this->dbHandle->real_escape_string($string);
		}

		public function __destruct() {
		}
	}