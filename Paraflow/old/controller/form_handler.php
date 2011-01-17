<?php
    session_start();
    require_once('../model/db.php');
    require_once('login.php');

    if (!empty($_POST['_get_function']))
    {
        $email_check="/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/";
        $letters_check="/^[A-Za-z\å\ä\ö\Å\Ä\Ö ]+$/";
        $char_check="/^[A-Za-z\å\ä\ö\Å\Ä\Ö!\?.,:-_ ]+$/";
        
        $web_safe_check="/^[A-Za-z0-9\?\&\#.:-_\å\ä\ö\Å\Ä\Ö]+$/";
        $blog_name_check="/^[A-Za-z\å\ä\ö\Å\Ä\Ö0-9\-_]{2,40} ?([A-Za-z\å\ä\ö\Å\Ä\Ö0-9\-_]{1,40})*/";
        $password_check="/^[A-Za-z\å\ä\ö\Å\Ä\Ö.,:-_@#€%&£$\?\§ ]+$/";
        $digit_check="/[0-9]+/";
        $char_digit_check="/^[1-9A-Za-z\å\ä\ö\Å\Ä\Ö ]+$/";
        $name_check="/^[0-9A-Za-z\å\ä\ö\Å\Ä\Ö]{2,40} ?[0-9A-Za-z\å\ä\ö\Å\Ä\Ö]{0,40} ?[0-9A-Za-z\å\ä\ö\Å\Ä\Ö]{0,40}$/";
        $url_check="/^(((ht|f){1}(tp:\/\/){1})|((www.){1}))+([a-zA-Z0-9-_\.]{2,50})/";  	
        
        foreach ($_POST as $key => $value)
        {
            $validation="false";
            if ($key=="name" || $key=="first_name" || $key=="last_name")
            {
                if (preg_match($name_check,$value)) 					// -[ONLY LETTERS + SPACE]- 
                    $validation="true";
            }
            elseif ($key=="email")
            {
                if (preg_match($email_check,$value))					//-[EMAIL CHECK]-
                    $validation="true";
            }
            elseif ($key=="url") 	
            {															//-[URL CHECK]-
                if (preg_match($url_check,$value) || strlen($value)<=1)
                    $validation="true";
            }
            elseif ($key=="text" || $key=="post") 						//-[TEXT CHECK]-
            {		
                if (strlen($value)>=2)
                    $validation="true";
            }
            elseif ($key=="title") 			
            {															//-[CHAR CHECK]-        
                if (preg_match($char_check,$value))
                    $validation="true";		
            }									
            elseif ($key=="category" || $key=="comment_id" || $key=="post_id" || $key=="publiced" || substr($key,0,4)=="date") //-[DIGIT CHECK]-
            {
            	if (preg_match($digit_check,$value))
                    $validation="true";
            }
            elseif ($key=="_get_function")	 							//-[FUNCTION CHECK]-
            {
            	if ($value=="new_comment" || $value=="show_comment" || $value=="hide_comment" || $value=="update_post" || $value=="new_blog" || $value=="add_user" || $value=="login" || $value=="logout" || $value=="new_post" || $value=="change_template"|| $value=="file_upload") 
                    $validation="true";
            }
            elseif ($key=="tags" || $key=="action")                           			//-[CHAR CHECK]-
            {
                if (preg_match($char_check,$value) || strlen($value)==0)
                    $validation="true";
            }
            elseif ($key=="password")                       			//-[PASSWROD CHECK]-
            {
            	if (preg_match($password_check,$value))
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
            }
            elseif ($key=="template")               					//-[ONLY WEB SAFE LETTERS CHECK]-
            {
            	if (preg_match($web_safe_check,$value))
                    $validation="true";
            }
            elseif ($key=="blog_name")               					//-[ONLY WEB SAFE LETTERS CHECK]-
            {
            	if (preg_match($blog_name_check,trim($value)) && strlen($value)>=1)
                    $validation="true";
            }
            elseif ($key=="submit" || $key=="password2" || $key=="action" || $key=="oldtags" || $key=="accept")       			//-[NO VALUE SET]- (inget som skrivs in direkt i databasen)
            {
               	$validation="true";
            }
            else                    									//-[NO VALIDATION]-
            {
            	$validation="false";
            }
            $values[$key] = array("value" => trim($value), "validated" => $validation);
        }

        foreach ($_GET as $key => $value)               				//  GET CHECK
        {
            $validation="false";
            if ($key=="page") 											//---- HUR SKA NAMNET PÅ BLOGGEN TILLÅTAS ATT SE UT??? ----
            {
                $validation = "true";
                $key="blog_name";
            }  
            elseif($key=="comment_id" || $key=="post_id")
                if (preg_match($digit_check,$value))
                    $validation="true";
            else
            	$values[$key] = array("value" => "key unknow", "validated" => "false");
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

    function new_comment($values)
    {
    	$author=$values['name']['value'];
    	$email=$values['email']['value'];
    	$webpage=$values['url']['value'];
    	$post_id=$values['post_id']['value'];
    	$text=$values['text']['value'];

        insert_to_db(array( 'author' => $author, 'email' => $email, 'webpage' => $webpage, 'comment' => $text, 'posts_id' => $post_id, 'hidden' => 0), 'comments');
        header('Location: ../index.php?page='.$_GET['page']);
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
    
    function add_user($values)
    {
   
        $first_name=$values['first_name']['value'];
        $last_name=$values['last_name']['value'];
        $email=$values['email']['value'];
        $password=$values['password']['value'];

         //Validering escapa å kontrollera rättigheter här    
        insert_to_db(array( 'first_name' => $first_name,'last_name' => $last_name, 'email' => $email, 'password' => $password), 'users');
        header('Location: ../index.php');
    }
    
    function change_template($values)
    {        
    	$blog_name=$values['blog_name']['value'];
    	
    	$template=$values['template']['value'];
    	
        update_db(array( 'template' => $template), 'blogs',"name='$blog_name'");
        header("Location: ../index.php?page=$blog_name");
    
    }   
      
    function login($values)
    {
    $email=$values['email']['value'];
    $password=$values['password']['value'];
        if($email && $password) 
        {

            $userinfo = select_from_db(array('password', 'id'),array('users'),array("email='$email'")); //hämtar hem användaruppgifter från angiven email
            
            $blogs = select_from_db(array('blogs.id', 'blogs.name','users__has__blogs.accesslevel'), array('blogs', 'users__has__blogs'), array('users__has__blogs.blogs_id = blogs.id', 'users__has__blogs.users_id ='.$userinfo[0]['id']));
            //print_r(blogs);
            if ($password==$userinfo[0]['password']) { //Kontrollerar om lösenordet stämmer
                $_SESSION['user_id'] = $userinfo[0]['id']; //Sätter anändarid i en session
                $_SESSION['user_name'] = $email;
                $_SESSION['blog_list'] = serialize($blogs);
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
