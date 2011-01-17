<?php

$conn = db_connect();

//Connect to the database
function db_connect($host = 'localhost', $user = 'root', $password = 'root', $db = 'blog')
{

    $conn = mysql_connect($host, $user, $password) or  
        die('Could not connect');

    mysql_select_db($db) or  
        die('Could not connect to database');
    
    return $conn;
    
}

//Closes an open databaseconnection
function db_disconnect($conn)
{

    //mysql_close($conn); 

}


/* 
Main select funtions that builds a query and executes the select statment returning a result array
*/
function select_from_db($colArray = array('*'), $fromTables = array(), $afterWhereArray = array(), $limit = '', $orderBy = '', $groupBy = '')
{

    $resultArray = array();
    
    
    //Building query
    $query = 'SELECT ' . implode(',', $colArray) . ' FROM ' . implode(',', $fromTables);
        
    if (count($afterWhereArray) > 0) 
    {
        $query .= ' WHERE '. implode(' AND ', $afterWhereArray);
    
    }
    
    
    
    if($groupBy)
        $query .= ' GROUP BY ' . $groupBy . ' ';
    
    if($orderBy != '')
        $query .= ' ORDER BY ' . $orderBy . ' ';

    if($limit != '')
        $query .= 'LIMIT ' . $limit;

    //echo $query;
    $result = mysql_query($query) or  
        die('Could not execute select query');
        
        
    while($row = mysql_fetch_assoc($result))
    {
        array_push($resultArray, $row);
    }

    
    //Returning the result
    return  $resultArray;
}

function insert_to_db($colValueArray = array(), $table) 
{
  

    //Building query
    $query = 'INSERT INTO ' . $table . ' SET ' ;

    foreach($colValueArray as $col => $value)
        {
			$value = mysql_real_escape_string($value);
            $query .= $col .'=' . "'$value'".', ';

        }
        //Delete the last ', '
        $query = substr($query, 0, strlen($query)-2);

    $result = mysql_query($query) or  
        die('Could not execute insert query');
            
    
}

function delete_from_db($table,$statement) {
    $query = 'DELETE FROM ' . $table . ' WHERE '.$statement;

    $result = mysql_query($query) or  
        die('Could not execute delete query');
}


function update_db($colValueArray = array(), $table, $where)
{
  

    //Building query
    $query = 'UPDATE ' . $table . ' SET ';

    foreach($colValueArray as $col => $value)
        {
        	
			$value = mysql_real_escape_string($value);
            $query .= $col .'=' . "'$value'".', ';
        }
        //Delete the last ', '
        $query = substr($query, 0, strlen($query)-2);
    
        $where = $where;
        
        $query .= ' WHERE ' . $where;
  
        // kanske räcker med att köra mysql_real_escape_string på $query innan execute? + borde vara säkrare?
    mysql_query($query) or  
        die('Could not execute update query');
    
    
}


function select_id_name_where_parent_mediatype($parent, $mediatype)
{
    
    return select_from_db(array('id','name'), 
        array('parent' => $parent, 'mediatype' => $mediatype));
    
}
