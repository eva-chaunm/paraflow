<?php
session_start();
require_once('../model/db.php');

if (isset($_GET['func'])) {
	$result = call_user_func($_GET['func'], $_POST);
}
	
function getMenu() {
	if (!(isset($_SESSION['user_id']))) {
		$getMenu = select_from_db(array('id,name'), array('menus'), array('id = 1'));
	} else {
		$getMenu = select_from_db(array('id,name'), array('menus'), array('id = 2'));
	}
	
	$results = select_from_db(array('id,parent_id,label,link,level'), array('menu_items'), array('menu_id = '.$getMenu[0]['id']),"","id");

	$menuName = $getMenu[0]["name"];

    $menuSelections = getMenuSelection($results, "0","-1");
    if (!(empty($menuSelections)))  
        $menu='{"'.$menuName.'":['.$menuSelections.'] }';

	echo $menu;
}

function getMenuSelection($results,$parent_id,$level) {
	$childmenu = "";
	$level++;
	foreach ($results as $result) {
		if ($result['parent_id'] == $parent_id && $result['level']==$level) { 
			$childmenu.='{';
	       	$childmenu.='"lable":"'.$result['label'].'",';
	        $childmenu.='"link":"'.$result['link'].'",';
        	
	       	$child = getMenuSelection($results, $result['id'],$result['level']);
        	if (!(empty($child)))  
        		$childmenu.='"child":['.$child.']';
        	else 
        		$childmenu.='"child":""';
        		
        	$childmenu.='},';
		} 	 	
	}
	$childmenu = substr($childmenu, 0, strlen($childmenu)-1);
	return $childmenu;
}
?>