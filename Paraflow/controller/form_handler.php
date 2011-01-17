<?php
    session_start();
    require_once('../model/db.php');
    require_once('login.php');

    if (!empty($_POST['_get_function']))
    {
        $email_check="/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/";
        $letters_check="/^[A-Za-z\å\ä\ö\Å\Ä\Ö ]+$/";
        $char_check="/^[A-Za-z\å\ä\ö\Å\Ä\Ö\!\?.,:-_ ]+$/";
        $web_safe_check="/^[A-Za-z0-9\?\&\#.:-_\å\ä\ö\Å\Ä\Ö]+$/";
        $digit_check="/[0-9]+/";
        $char_digit_check="/^[1-9A-Za-z\å\ä\ö\Å\Ä\Ö ]+$/";
        $name_check="/^[0-9A-Za-z\å\ä\ö\Å\Ä\Ö]{2,40} ?[0-9A-Za-z\å\ä\ö\Å\Ä\Ö]{0,40} ?[0-9A-Za-z\å\ä\ö\Å\Ä\Ö]{0,40}$/";
        $url_check="/^(((ht|f){1}(tp:\/\/){1})|((www.){1}))+([a-zA-Z0-9-_\.]{2,50})/";  	
		$skype_check="/^[A-Za-z\.\-\_]+/";
		$birthdate_check="/^[0-9\-]+/";
		
        foreach ($_POST as $key => $value)
        {
            $validation="false";
            if ($key=="name" || $key=="first_name" || $key=="last_name" || $key=="country"|| $key=="city") {
                if (preg_match($name_check,$value)) 											// -[Letters and space]- 
                    $validation="true";
            } elseif ($key=="email") {
                if (preg_match($email_check,$value))
                    $validation="true";
            } elseif ($key=="alias") {
                if (preg_match($char_digit_check,$value)) 										//-[Charters and digits and space]-
                    $validation="true";
            } elseif ($key=="birthdate") {
                if (preg_match($birthdate_check,$value)) 										//-[Birthdate]-
                    $validation="true";
            } elseif ($key=="url") {															//-[URL]-
                if (preg_match($url_check,$value) || strlen($value)<=1)
                    $validation="true";
            } elseif ($key=="text" || $key=="post") {											//-[Text]-
                if (strlen($value)>=2)
                    $validation="true";
            } elseif ($key=="title") {															//-[Char]-        
                if (preg_match($char_check,$value))
                    $validation="true";
            } elseif ($key=="skype") {															//-[Skype]-        
                if (preg_match($skype_check,$value))
                    $validation="true";		
            } elseif ($key=="category" || $key=="comment_id" || $key=="post_id" || $key=="publiced" || substr($key,0,4)=="date") {//-[Digits]-
            	if (preg_match($digit_check,$value))
                    $validation="true";
            } elseif ($key=="_get_function") {	 												//-[Function]-
            	if ($value=="register" || $value=="login" || $value=="logout"  || $value=="change_template"|| $value=="file_upload") 
                    $validation="true";
            } elseif ($key=="tags" || $key=="action") {                          				//-[Char]-
                if (preg_match($char_check,$value) || strlen($value)==0)
                    $validation="true";
            } elseif ($key=="password") {                       								//-[Password]-
            	if (strlen($value)>4)
            	{
            		if(isset($_POST['password2']))
            		{
            			if ($value==$_POST['password2'])
            			{
            				$validation="true";
            			}
            		}
            		else
            		{
                    	$validation="true";
            		}
            	}
            } elseif ($key=="template") {              					//-[ONLY WEB SAFE LETTERS CHECK]-
            	if (preg_match($web_safe_check,$value))
                    $validation="true";
            } elseif ($key=="submit" || $key=="password2" || $key=="action" || $key=="oldtags" || $key=="accept") {       			//-[Ingen validering]-
               	$validation="true";
            } else {                   									//-[NO VALIDATION]-
            	$validation="true";//för att underlätta utvecklingen
            }
            $values[$key] = array("value" => trim($value), "validated" => $validation);
        }

        $error_string="";

    	foreach ($values as $key => $value) //Går igenom arrayen med alla poster
		{
			if ($value['validated']=="false")
				$error_string.="Felaktig inmatning: ". $key . ": ". $value['value'] . " " . $value['validated'] ."<br />";
		}

		if ($error_string) {
			echo $error_string;
			die;
		}
		
        if ($values['_get_function']['validated']=="true")
             $function=$values['_get_function']['value'];
		
        if (isset($function))
            call_user_func($values['_get_function']['value'],$values);
    }

    function hide_comment($values)
    {
    	$blog_name=$values['blog_name']['value'];
    	$post_id=$values['post_id']['value'];
    	
    	if (is_owner($blog_name)) 
    	{
        	update_db(array( 'hidden' => 1), 'comments','id=' .$values['comment_id']['value']. '');
    	}
        	
        header('Location: ../index.php?page=' .$blog_name. '&admin_page=show_comments&postid=' .$post_id. '');
    }

    function show_comment($values)
    {
    	$blog_name=$values['blog_name']['value'];
    	$post_id=$values['post_id']['value'];
    	if (is_owner($blog_name)) 
    	{
        	update_db(array( 'hidden' => 0), 'comments','id=' .$values['comment_id']['value']. '');
    	}
    		
        header('Location: ../index.php?page=' .$blog_name. '&admin_page=show_comments&postid=' .$post_id. '');
    }

    function register($values)
    {
    	$first_name=$values['first_name']['value'];
    	$last_name=$values['last_name']['value'];
     	$email=$values['email']['value'];
     	$password=$values['password']['value'];
    	$alias=$values['alias']['value'];
      	$country=$values['country']['value'];
      	$city=$values['city']['value'];
    	$birthdate=$values['birthdate']['value'];
    	
        $userinfo = select_from_db(array('alias', 'email'),array('users'),array("alias='$alias'")); 
    	
    	if (isset($userinfo[0]['alias'])) {
	       	header('Location: ../index.php?p=1');//Användarnamnet upptaget.
            
        } else {
        	
	        $user_id = insert_to_db(array( 'first_name' => $first_name, 'last_name' => $last_name, 'email' => $email, 'password' => $password, 'alias' => $alias, 'birth_city' => $city, 'birth_country' => $country, 'birth_date' => $birthdate), 'users');
	        $_SESSION['user_id'] = $user_id; //Sätter anändarid i en session
            $_SESSION['user_name'] = $alias;	       	
	        header('Location: ../index.php?p=startpage');//Inloggad användare
        }
    }
    
    function file_upload($values)
    {
    if ((($_FILES["file"]["type"] == "image/gif")
	|| ($_FILES["file"]["type"] == "image/jpeg")
	|| ($_FILES["file"]["type"] == "image/png")
	|| ($_FILES["file"]["type"] == "image/pjpeg"))
	&& ($_FILES["file"]["size"] < 200000))
	  {
	  if ($_FILES["file"]["error"] > 0)
	    {
	    echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
	    }
	  else
	    {
	    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
	    echo "Type: " . $_FILES["file"]["type"] . "<br />";
	    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
	    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
	
	    if (file_exists("upload/" . $_FILES["file"]["name"]))
	      {
	      echo $_FILES["file"]["name"] . " already exists. ";
	      }
	    else
	      {
	      move_uploaded_file($_FILES["file"]["tmp_name"],
	      "../upload/" . $_FILES["file"]["name"]);
	      echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
	      }
	    }
	  }
	else
	  {
	  echo "Invalid file";
	  }
    }
      
    function login($values)
    {
    $email=$values['email']['value'];
    $password=$values['password']['value'];
        if($email && $password) 
        {

            $userinfo = select_from_db(array('password', 'id'),array('users'),array("email='$email'")); //hämtar hem användaruppgifter från angiven email
            
            if ($password==$userinfo[0]['password']) { //Kontrollerar om lösenordet stämmer
                $_SESSION['user_id'] = $userinfo[0]['id']; //Sätter anändarid i en session
                $_SESSION['user_name'] = $email;
                header('Location: ../index.php');
            } else {   
                header('Location: ../index.php?msg=1');//Användarnamnet och lösenordet stämmer inte överens 
            }
        
        } 
        else 
        {
            header('Location: ../index.php?msg=2');//Inget användarnamn eller lösenord angvet
        }

    }

    function logout()
    {
        $_SESSION = array();
        header('Location: ../index.php?msg=3'); //Du är nu utloggad
    }
