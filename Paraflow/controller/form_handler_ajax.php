<?php
session_start();
require_once('../model/db.php');

if (isset($_GET['func'])) {
	$result = call_user_func($_GET['func'], $_POST);
}

function createGroup($params) {
	$group_name = $params['groupName'];
	
	$user_id = $_SESSION['user_id'];
	
	$groupinfo = select_from_db(array('name'),array('groups'),array("name='$group_name'")); 
    	
   	if (isset($groupinfo[0]['name'])) {
		echo '{"added":"none"}';	 
    } else {	
		$membershipRules = $params['membershipRules'];
		$administratorRules = $params['administratorRules'];
		$groupDescriptionText = $params['groupDescriptionText'];
    	
	    $group_id = insert_to_db(array('membershipRules' => $membershipRules,'description' => $groupDescriptionText,'administratorRules' => $administratorRules,'name' => $group_name), 'groups');
	    
	    insert_to_db(array('user_id' => $user_id, 'group_id' => $group_id), 'user__has__group');
	    echo '{"added":"group"}';	   
    }
}

function createEvent($params) {
	$event_name = $params['eventName'];

	$user_id = $_SESSION['user_id'];

	$event_info = select_from_db(array('name'),array('events'),array("name='$event_name'")); 

   	if (isset($event_info[0]['name'])) {
		echo '{"added":"none"}';	 
    } else {	
    	$membershipRules = $params['membershipRules'];

//    	$groupId = isset($params['groupId'])?$params['groupId']:'0';

	    $event_id = insert_to_db(array('access' => $membershipRules,'name' => $event_name), 'events');
	    insert_to_db(array('user_id' => $user_id, 'event_id' => $event_id), 'user__has__event');
	    echo '{"added":"event"}';	
    }
}

function createRegister($params) {
	
//	$event_name = $params['EventName'];
//	
//	$user_id = $_SESSION['user_id'];
//	
//	$event_info = select_from_db(array('name'),array('events'),array("name='$event_name'")); 
// 
//   	if (isset($event_info[0]['name'])) {
//				echo '{"added":"none"}';	 
//    } else {	
//    	$membershipRules = $params['membershipRules'];
//    	$groupId = $params['groupId'];
//    	
//	    $event_id = insert_to_db(array('access' => $membershipRules,'name' => $event_name), 'events');
//	    insert_to_db(array('user_id' => $user_id, 'event_id' => $event_id), 'user__has__event');
//	    echo true;
//    }
    echo '{"added":"user"}';	
}