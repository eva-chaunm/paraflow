<?php
function get_document_head()
{
	
	$title = 'ParaFlow'; 
	$css_file = 'view/templates/css/style.css';
	$java_script = 'js/scripts.js';
	$jquery = 'js/jquery-1.4.3.js';
    
    $output='';
    
    $output = <<<OUT
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml"> 
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
			<title>ParaFlow</title>
			<link rel="shortcut icon" href="view/templates/img/favicon.ico" />
			<link rel="stylesheet" type="text/css" href="view/templates/css/style_default.css" />
			<link rel="stylesheet" type="text/css" href="view/templates/css/smoothness/jquery-ui-1.8.6.custom.css" />
			
			<script type="text/javascript" src="js/jquery-1.4.3.js"></script>
			<script type="text/javascript" src="js/jquery-ui-1.8.6.custom.min.js"></script>		
			<script type="text/javascript" src="js/scripts.js"></script>
			<script type="text/javascript" src="js/pages.js"></script>
		</head>
		<body>
		<div id="container">
OUT;
	
	return $output;
    
}

function get_header_start()
{
	return '<div id="header">';
}
function get_header_end()
{
	return '</div>';
}

function get_menu()
{
    $output = '';
        
    $output = <<<OUT
    
	<div id="menuStyle">
		<ul id="menu">
		</ul>
	</div><!-- END DIV MENU  -->
		
OUT;
	return $output;
}

function get_login()
{
    $output = '';
        
    $output = <<<OUT
        <div id="mainContainer">
		</div>
    	<div class="mainContainerObjectLogin">
			<form id="loginForm" action="controller/form_handler.php" method="post">
				<ul>
					<li>
						<label for="email">E-mail</label>
					</li>
					<li>
						<input type="text" value="" size="15" class="standardInput" name="email" id="email"/>
					</li>
					<li>
						<label for="password">Password</label>
					</li>
					<li>
				 		<input type="password" value="" size="15" name="password" class="standardInput" id="password"/>
				 	</li>
				 	<li>
						<label for="login" class="hidden">Login</label>
						<input type="hidden" value="login" name="_get_function" id="_get_function"/>
						
						<input id="login" type="submit" value="Log in" class="submitButton" name="submit"/>
					</li>
				</ul>
			</form> 
		</div>
OUT;
	
return $output;
}
function get_logout()
{
    $output = '';
    $output = <<<OUT

   			<div id="logout">
				<form id="logoutForm" action='controller/form_handler.php' method="post">
					<ul>
						<li>
							<label for="logout" class="hidden">Logout</label>
							<input id="logoutButton" type="submit" value="Logout" name="submit"/>
							<input type="hidden" value="logout" name="_get_function" class="submitButton" id="_get_function"/>    
						</li>
					</ul>             
				</form>
			</div>
			
OUT;
	return $output;
}
				

function get_guest_menu()
{
    $output = '';
        
    $output = <<<OUT
    
	<div id="menuStyle">
		<ul id="menu">
		</ul>
	</div><!-- END DIV MENU  -->
		
OUT;
	return $output;
}

function get_default($text)
{
	$output = '';
    
    $output = <<<OUT
    <div id="mainContainer">
		$text
	</div>
OUT;
	
return $output;

}
function get_fileupload()
{
	$output = '';
    
    $output = <<<OUT
    <div id="fileupload">
		<form action="controller/form_handler.php" method="post" enctype="multipart/form-data">
			<label for="file">Filename:</label>
			<input type="file" name="file" id="file" />
             <input type="hidden" value="file_upload" name="_get_function" id="_get_function">
			
			<br />
			<input type="submit" name="submit" value="Submit" />
		</form>
	</div>
OUT;
	
return $output;

}
function get_flowing()
{
	$output = '';
    
    $output = <<<OUT
    <div id="flowing">
		<form action="" method="post">
			<label for="target">Target event</label>
			
			<select name="target">
				<option value="Trlalal">Trlalal</option>
				<option value="Wassa">Wassa</option>
				<option value="Uabas">Uabas</option>
			</select>
			
			<label for="flowing">Flowing</label>
			<input type="text" name="flowing" class="textFlow">
			<input type="submit">
		</form>
	</div>
OUT;
	
return $output;
}
function get_event()
{
	$output = '';
    
    $output = <<<OUT
    <div id="event">
		<form action="" method="post">
			<label for="target">Target</label>
			
			<select name="target">
				<option value="Private">Private</option>
				<option value="ParaFlow">ParaFlow</option>
				<option value="Public">Public</option>
			</select>
			
			<label for="evente">Event</label>
			<input type="text" name="event" class="event">
			<input type="submit" value="Create Event">
		</form>
		<br/>
		<div id="declarationEvent">
			<table>
				<tr class="firstColumn">
					<td width="200px">Option</td>
					<td>Declaration</td>
				</tr>
				<tr>
					<td>Private</td>
					<td>just for you</td>
				</tr>
				<tr>
					<td>ParaFlow</td>
					<td>everyone on ParaFlow gets access to your post</td>
				</tr>
				<tr>
					<td>Public</td>
					<td>everyone can access your post</td>
				</tr>
			</table>
		</div>
	</div>
OUT;
	
return $output;
}

function get_profile($recipe)
{
	$output = '';
    
    $output = <<<OUT
	<div id="profile">
	</div>
OUT;
	
return $output;

}

function get_footer()
{
	$output='';
    
	$output = <<<OUT
	
		<div id="bottom"></div>
	</div><!-- END DIV CONTAINER  --> 

OUT;

	return $output;
	
}


function get_document_end()
{
    
	$output='';
    
	$output = <<<OUT

		</body>
	</html>

OUT;

	return $output;
    
}