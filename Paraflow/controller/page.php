<?php
require_once('controller/login.php');

function show_page($page)// ----[PAGE START]---
{   
    $template = "view/templates/default_template.php";
    
    if (file_exists($template) && is_file($template)) {
        require_once($template);
    } else {
        require_once("view/templates/default_template.php");
    }
    
    echo get_document_head();
    
    
    echo get_header_start();
    
        if (is_logged_in()) {
			echo get_logout();
        } else {
        	
        }
    echo get_header_end();
        
    if (is_logged_in()) {
    	echo get_menu();
    } else {
		echo get_guest_menu();
		
	}
    
	
	if (is_logged_in()) {
	 	if ($page=="startpage") {
	 		echo "startpage";	 		
	 	} else if ($page=="fileupload") {
	 		echo get_fileupload();
	 	
	 	} else if ($page=="nyheter") {
	 		echo get_news();
	 	} else if ($page=="flowing") {
	 		echo get_flowing();
	 	} else if ($page=="event") {
	 		echo get_event();
	 	} else if ($page=="profile") {
	 		$user_id=1;
	 		echo get_profile($user_id);
	 		
	 	} else {
	 		echo get_default("");		
	 	}

	} else {
	 	echo get_login();
	}
 
    echo get_footer();
    
    echo get_document_end();   
}
