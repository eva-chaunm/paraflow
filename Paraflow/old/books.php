<?php
	include("Database.class.php");

	if (isset($_GET['func'])) {
		$result = call_user_func($_GET['func'], $_POST);
		echo json_encode($result['rows']);
	}

// vill ha en parameted som heter 'string'
	function search($params) {
		$s = $params['string'];
		
		$db = Database::getInstance();
		$q = "
			SELECT 
				id,
				title,
				review
			FROM
				books
			WHERE
				title LIKE '%$s%';";
				
		return $db->preparedQuery($q);
	}

//vill ha en parameter som heter 'id'
	function getMoreInfo($params) {
		$id = $params['id'];
		$db = Database::getInstance();
		
		$q = "
			SELECT 
				*
			FROM
				books
			WHERE
				id = '$id'";
		return $db->preparedQuery($q);
	}
	

?>