<?php
require_once('controller/login.php');
require_once('books.php');

function show_page($page) 														// ----[PAGE START]---
{   
      
    $template='';
    $posts_per_page = 5;
    $page_nr = isset($_GET['page_nr'])?$_GET['page_nr']:'0';
    $limit = $page_nr*$posts_per_page .", $posts_per_page";
//    $template_file = select_from_db(array('blogs.template'), array('blogs'), array("blogs.name='$page'"));
//    $template = "view/templates/" . $template_file[0]['template'];

    $template = "view/templates/default_template.php";
    
    if (file_exists($template) && is_file($template))
    {
        require_once($template);
    }
    else
    {
        require_once("view/templates/default_template.php");
    }
    
    echo get_document_head();
    
    echo get_header();
    echo get_menu();
        
 	if ($page=="startpage") {
 		
 		echo "startpage";
 	} else if ($page=="search") {
 		echo get_searchbar();
 		echo get_search_results();
 		echo get_thechosen();
 		
 	} else if ($page=="fileupload") {
 		echo get_fileupload();
 	
 	} else if ($page=="nyheter") {
 		echo get_news();
 	} else if ($page=="receipes") {
 		$recipe = "Hallonmums";
 		echo get_recipes($recipe);
 		
 	} else {
 		echo get_default("Välkommen");		
 	}
 
    echo get_footer();
    
    echo get_document_end();   
}

function is_page_private()
{


}

function translate_title($title)
{

    if($title == "publiced")
        return "Publiserat";
    elseif($title == "publication_by_date")
        return "Framskjuten Publisering";
    elseif($title == "unpubliced")
        return "Utkast";
}


function get_date ($datecount,$selected,$max,$type)
{			
	$returning = "<select name='date$type'>";
	$returning=$returning."<option value='-'>-</option>";
	if (strlen($selected)==1) $selected="0".$selected;
	while ($datecount<=$max) 
	{
		if ($datecount==$selected) 
			if ($selected<10)
				$returning=$returning."<option selected value='0$datecount'>0$datecount</option>";
			else
				$returning=$returning."<option selected value='$datecount'>$datecount</option>";
		else
			if ($datecount<10)
				$returning=$returning."<option value='0$datecount'>0$datecount</option>";
			else
			$returning=$returning."<option value='$datecount'>$datecount</option>";
		$datecount++;
	}
	$returning=$returning."</select>";	
	
	return $returning;
}

function get_category ($categori_id) {
	$category_selection =  "<select name='category' id='category'>";
    $categorys = select_from_db(array('id','category'), array('categories'));
	foreach ($categorys as $categori)
    { 
        $category_selection=$category_selection."<option value='".$categori['id']."'";
		if ($categori['id']==$categori_id) $category_selection=$category_selection."selected";
		$category_selection=$category_selection. ">".$categori['category']."</option>";
    }
	$category_selection=$category_selection."</select>";
	return $category_selection;
}





function to_assoc_array($input_array)
{
    
    $assoc_array = array();
    
    foreach ($input_array as $sub_array)
    {
        
        if (count($sub_array) > 2)
        {
            
            $assoc_array[array_shift($sub_array)] =  $sub_array;
        
        }
        elseif (count($sub_array) == 2)
        {
        
             $assoc_array[array_shift($sub_array)] = array_shift($sub_array);
        
        }
        
    }
    
    //print_r($assoc_array);
    return $assoc_array;
}