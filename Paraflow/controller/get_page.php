<?php
session_start();
require_once('../model/db.php');

if (isset($_SESSION['user_id'])) {
	$user_id = $_SESSION['user_id'];
} else {
	$user_id = 1;
}



if (isset($_GET['p'])) {
	$result = call_user_func($_GET['p'], $_POST);
}
if (isset($_GET['func'])) {
	$result = call_user_func($_GET['func'], $_POST);
}

function happyning($params) {
	
	$information = "happyning";
	
	echo $information;
}

function flowing($params) {
	echo "flowing";
}

function event($params) {
	echo "event";
}

function profile($params) {
	echo "profile";
}

function groups($params) {
	echo "groups";
}

function checkIfgroupNameExist($params) {
	$group_name = $params['name'];

    $group_info = select_from_db(array('name'),array('groups'),array("name='$group_name'")); 
    
    if (isset($group_info[0]['name'])) {
    	echo true;
    } else {
		echo false;
    }
}

function checkIfeventNameExist($params) {
	$event_name = $params['name'];

    $event_info = select_from_db(array('name'),array('events'),array("name='$event_name'")); 
    
    if (isset($event_info[0]['name'])) {
    	echo true;
    } else {
		echo false;
    }
}

function checkIfEMailExist($params) {
	$email = $params['name'];

    $event_info = select_from_db(array('email'),array('users'),array("email='$email'")); 
    
    if (isset($event_info[0]['email'])) {
    	echo true;
    } else {
		echo false;
    }
}

function checkIfAliasExist($params) {
	$alias = $params['name'];

    $event_info = select_from_db(array('alias'),array('users'),array("alias='$alias'")); 
    
    if (isset($event_info[0]['alias'])) {
    	echo true;
    } else {
		echo false;
    }
}


function getEventList($params) {
	$events = select_from_db(array('name,id'),array('events, user__has__event'),array("events.id = user__has__event.event_id AND user__has__event.user_id = 1"),"","name"); 
	echo json_encode($events);
}

function getAllPublicGroups($params) {
	$events = select_from_db(array('name,id'),array('groups'),array("membershipRules=1 OR membershipRules=2"),"","name"); 
	echo json_encode($events);
}

function getUserHasGroups($params) {
	$events = select_from_db(array('name,id'),array('events, user__has__event'),array("events.id = user__has__event.event_id AND user__has__event.user_id = 1"),"","name"); 
	echo json_encode($events);
}

function getAllPublicGroupsExeptTheOnesUserHas($params) {
	$events = select_from_db(array('name,id'),array('events, user__has__event'),array("events.id = user__has__event.event_id AND user__has__event.user_id = 1"),"","name"); 
	echo json_encode($events);
}

