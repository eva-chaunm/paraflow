<?php
session_start();
require_once('../model/db.php');

if (isset($_GET['func'])) {
	$result = call_user_func($_GET['func'], $_POST);
}
	
//function get_menu($params) {
////	$timestamp = isset($_SESSION['chat_timestamp'])?$_SESSION['chat_timestamp']:Date("Y-m-d H:i");
//	$last_post_id =  isset($params['last_post_id'])?$params['last_post_id']:0;
//	$game_id=$params['game_id'];
//	$user_id = $_SESSION['user_id'];
//	//$last_post=0;
//	//$result = call_user_func($_GET['func'], $_POST);
////	$chat_room_id = $params['chat_room_id'];
////	$user_id = $params['user_id'];
//	$result = select_from_db(array('menu',
//									'chat_messages.count', 
//									'chat_messages.message',
//									'chat_messages.timestamp',
//									'chat_rooms__got__users.chat_room_id',
//									'users.alias'),
//							 array('chat_messages',
//									'chat_rooms',
//							 		'chat_rooms__got__users',
//							 		'users'),
//							 array("
//									chat_rooms__got__users.user_id = '" . $user_id . "' AND
//									chat_rooms__got__users.chat_room_id = chat_rooms.id AND
//									chat_rooms.game_id = '" . $game_id . "' AND
//									chat_messages.chat_room_id = chat_rooms__got__users.chat_room_id AND
//									users.id = chat_messages.user_id AND
//									chat_messages.count > '" . $last_post_id . "'
//									"),
//							 "",
//							 "chat_messages.count"
//	);
//	$_SESSION['chat_timestamp'] = time();
//	echo json_encode($result);
//}

function getMenu() {
	$menu = select_from_db(array('id,name'), array('menus'), array('user_id = 1'));
	
	$results = select_from_db(array('id,parent_id,label,link,level'), array('menu_items'), array('menu_id = '.$menu[0]['id']));

	$menuName = $menu[0]["name"];
	
	$menu = array();
	$menu['name']=$menuName;
	$i=0;
	foreach ($results as $result) {
		if ($result['parent_id'] == 0) {
//			$menu('label' => $result['label'],
//			
//				);
	        $menu[$i]['label'] = $result['label'];
	        $menu[$i]['link'] = $result['link'];
        	$child = getChilds($results, $result['id'],$result['level']);
        	if (!(empty($child)))  
        		$menu[$i]['child']=$child;
        	else 
        		$menu[$i]['child']="";
		} 	 	
        $i++;
	}
//	foreach ($menu as $menuItem) {
//		echo $menuItem['label']." ". $menuItem['link']." ".$menuItem['childs']."\n";
//	}
//	foreach($menu as $menuItem) {
//		echo $menuItem;
////		if ($menuItem=array)
//	}
//	
	
	echo json_encode($menu,JSON_FORCE_OBJECT);
}

function getChilds($results,$parent_id,$level) {
	$childmenu = array();
	$level++;
	$i=0;
	foreach ($results as $result) {
//		echo $result['id']." ".$parent_id. ", level:".$level." ".$result['level']."\n";
		if ($result['parent_id'] == $parent_id && $result['level']==$level) { 
			$childmenu[$i]['label'] = $result['label'];
	        $childmenu[$i]['link'] = $result['link'];
	       	$child = getChilds($results, $result['id'],$result['level']);
        	if (!(empty($child)))  
        		$childmenu[$i]['child']=$child;	        
        	else 
        		$childmenu[$i]['child']="";
		} 	 	
        $i++;
	}
	return $childmenu;
}

//mysql_free_result($items);
//
//
//class Menu {
//	public function Menu() {
//		echo "Title of the menu";
//		
//	}
//}
//$menu = new Menu();
//





//							 		chat_messages.user_id = users.id AND//
//									chat_rooms__got__users.chat_room_id ='$chat_room_id' AND
//GROUP BY chat_messages.chat_room_id <--- skriver ut 1 i taget för varje "update messages i JS"

function send_message($params) {
	$user_id = $_SESSION['user_id'];
	$message = $params['message'];
	$chat_room_id = $params['chat_room_id'];
	insert_to_db(array('user_id' => $user_id, 'message' => $message, 'chat_room_id' => $chat_room_id), 'chat_messages');
}
function create_room($params) {
	$game_id = $params['game_id'];
	$name = $params['with_user_alias'];
	$user_id = $_SESSION['user_id'];
	
	$with_user_alias = $params['with_user_alias'];
	$with_user_id = $params['with_user_id'];
	
	$chat_room_id = insert_to_db(array('owner_id' => $user_id,'game_id' => $game_id, 'name' => $name), 'chat_rooms');
	
	insert_to_db(array('user_id' => $user_id, 'chat_room_id' => $chat_room_id), 'chat_rooms__got__users');
	insert_to_db(array('user_id' => $with_user_id, 'chat_room_id' => $chat_room_id), 'chat_rooms__got__users');
	insert_to_db(array('user_id' => $user_id, 'message' => "*** has entered the chat ***", 'chat_room_id' => $chat_room_id), 'chat_messages');
	insert_to_db(array('user_id' => $with_user_id, 'message' => "*** has entered the chat ***", 'chat_room_id' => $chat_room_id), 'chat_messages');
	
	$temp = array ('user_id' => $user_id, 'chat_room_id' => $chat_room_id, 'chat_room_name' => $name);
	echo json_encode($temp);
}
function invite_player($params) {
	$user_id = $params['user_id'];
	$chat_room_id = $params['chat_room_id'];
	insert_to_db(array('user_id' => $user_id, 'chat_room_id' => $chat_room_id), 'chat_rooms__got__users');
	insert_to_db(array('user_id' => $user_id, 'message' => "*** has entered the chat ***", 'chat_room_id' => $chat_room_id), 'chat_messages');
}

function get_room_info($params) {
	$user_id = $_SESSION['user_id'];
	
	$user_alias = select_from_db(array('alias'), array('users'), array("id = $user_id"));
	$game_id = $params['game_id'];
	$chat_room_id = $params['chat_room_id'];
	$names = select_from_db(array('alias'),array('users,chat_rooms__got__users'),array("chat_rooms__got__users.chat_room_id = $chat_room_id AND chat_rooms__got__users.user_id = users.id"));	
	$result = select_from_db(array('chat_rooms.name'),array('chat_rooms'),array('chat_rooms.id = '.$chat_room_id));
	$result[0]['name']="";
//	echo $user_alias[0]['alias']." ".$names;
	foreach ($names as $name) {
		if ($user_alias[0]['alias']!=$name['alias'])
			$result[0]['name']=$result[0]['name'].$name['alias'].", ";
	}
    $result[0]['name'] = substr($result[0]['name'], 0, strlen($result[0]['name'])-2);
    
    $name_temp=$result[0]['name'];
	
	if ($name_temp==false) {
		$result[0]['name']="Tom Chatt";
	} 
		
	echo json_encode($result);
}

function get_users_in_game($params) {
	$game_id = $params['game_id'];
	$user_id = $_SESSION['user_id'];
	$chat_room_id = $params['chat_room_id'];
	$result = select_from_db(array('users.alias, users.id, chat_rooms__got__users.chat_room_id,chat_rooms.game_id'),
							array('users,chat_rooms__got__users,chat_rooms'),
							array("chat_rooms.game_id = '" . $game_id . "' AND
							chat_rooms__got__users.chat_room_id = chat_rooms.id AND
							chat_rooms__got__users.user_id = users.id"
	));
	echo json_encode($result);
}
function get_users_in_game_but_not_in_this_chat($params) {
	$game_id = $params['game_id'];
	$chat_room_id = $params['chat_room_id'];
	$user_id = $_SESSION['user_id'];
	$result = select_from_db(array('alias,users.id'),
							array('users,users__got__games'),
							array("users__got__games.game_id = $game_id AND 
							users__got__games.user_id = users.id AND users.id NOT IN (
							SELECT users.id FROM users,chat_rooms__got__users
							WHERE chat_rooms__got__users.chat_room_id = $chat_room_id AND
							chat_rooms__got__users.user_id = users.id )"
	));
	echo json_encode($result);
}
function exit_room($params) {
	$chat_room_id = $params['chat_room_id'];
	$user_id = $_SESSION['user_id'];
	insert_to_db(array('user_id' => $user_id, 'message' => "*** has left the chat ***", 'chat_room_id' => $chat_room_id), 'chat_messages');
	$statement = "user_id = ".$user_id." AND chat_room_id = ".$chat_room_id;
	delete_from_db("chat_rooms__got__users",$statement);
}
?>