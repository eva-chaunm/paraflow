<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<?php
//mysql_connect("localhost","root","root")
//mysql_select_db("paraflow");
//
//require_once("ravechart.class.php");
//
//$ravechart = new RaveChart(null,array('type' => '' ,'profile' => 'reflector', 'city' => 'stockholm'));
$page=$_GET['p'];

include('books.php');

//$person = new Person("Kalle","999919292");
//$person2 = new Person("Stina");
//
//
//$person->sayHelloTo($person2);
//echo $person->getName();
//echo $person2->getName();
//include_once('image.php');

?>
<html>
<head>
    <link rel="stylesheet" href="style.css" />
	<script src="jquery-1.4.3.js" type="text/javascript"></script>
	<script src="scripts.js" type="text/javascript"></script>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>ParaFlow</title>
</head>
<body>
	<div id="container">
		<div id="header"></div>
		<div id="menuStyle">
			<ul id="myMenu">
			</ul>
		</div><!-- END DIV MENU  --> 
		<?php 
		if ($page="startpage") {
			require("startpage.html.inc");
		} else if ($page="fileupload") {
			require("startpage.html.inc");
		} else {
			
			
		}
		
		?>
		<div id="searchbar">
			<form action="" method="post">
				<label for="searchfield">Sökfält</label>
					<input name="searchfield" id="searchfield" />
				<label class="hidden" for="searchbutton">Sök</label>
					<input type="button" name="searchbutton" id="searchbutton" value="Sök" />
					
				<label class="hidden" for="removebutton">Rensa all sökresultat</label>
					<input type="button" name="removebutton" id="removebutton" value="Rensa all sökresultat" />
			</form>
		</div><!-- END DIV SEARCHBAR  --> 
		<div id="result">
		</div><!-- END DIV RESULT  --> 
		<div id="thechosen">
			<dl></dl>
		</div><!-- END DIV THECHOSEN  --> 
		<div id="bottom"></div>
	</div><!-- END DIV CONTAINER  --> 
</body>
</html>