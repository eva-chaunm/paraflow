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
			<link rel="stylesheet" type="text/css" href="view/templates/css/style_default.css" />
			<link rel="stylesheet" type="text/css" href="view/templates/css/smoothness/jquery-ui-1.8.6.custom.css" />
			
			<script type="text/javascript" src="js/jquery-1.4.3.js"></script>
			<script type="text/javascript" src="js/jquery-ui-1.8.6.custom.min.js"></script>		
			<script type="text/javascript" src="js/scripts.js"></script>
		</head>
		<body>
		<div id="container">
OUT;
	
	return $output;
    
}

function get_header()
{
    $output='';
    $output = <<<OUT
    
	<div id="header"></div>	
OUT;
	
	return $output;   
}

function get_menu()
{
    $output = '';
        
    $output = <<<OUT
    
	<div id="menuStyle">
		<ul id="myMenu">
		</ul>
	</div><!-- END DIV MENU  -->
		
OUT;
	return $output;
}

function get_searchbar()
{
    $output = '';
        
    $output = <<<OUT
    
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
	
OUT;
	
	return $output;
}

function get_search_results($author='',$email='',$webpage='',$date='', $comment='')
{
	$output = '';
        
	$output = <<<OUT
	
	<div id="result">
	</div><!-- END DIV RESULT  --> 
		
OUT;

   return $output;

}

function get_thechosen()
{
	$output = '';
    
    $output = <<<OUT
    
	<div id="thechosen">
		<dl></dl>
	</div><!-- END DIV THECHOSEN  --> 

OUT;
	
	return $output;

}
function get_news()
{
	$output = '';
    
    $output = <<<OUT
    <div id="news">
		Nyheter
	</div>
OUT;
	
return $output;

}
function get_default($text)
{
	$output = '';
    
    $output = <<<OUT
    <div id="default">
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

function get_recipes($recipe)
{
	$output = '';
    
    $output = <<<OUT
	<div id="recipe">
		<h1>$recipe</h1>
		<div class="ingrediens">
			<h2>Ingridienser</h2>
			<table>
				<tr>
					<td>1 dl</td>
					<td>Dinkelflingor</td>
				</tr>
				<tr>
					<td>2 dl</td>
					<td>Vatten</td>
				</tr>
			</table>
		</div>
		<div>
			BILD
		
		</div>
		<div>
			<h2>Utförande</h2>
			<p>
			Tag en lämlig kastrull och placera den på passande platta, häll i och blanda dinkelflingor, kokosflingor, kryggor, salt och vattan, sätt på plattan på medelhög värme. Ett litet tipps till dig som vill leva lite mer i äventyret, sätt på plattan innan alla indigrienser är blandade och avsluta med vatten.
			</p>
			<p>
			Hacka daddlar, fikon och annan önskad torkad frukt och häll i kastrullen.
			</p>
			<p>
			När gröten har fått kokat någon eller några minuter beroende på värme så stäng av plattan, jag brukar köra på 4/6 och nästan så fort gröten kokat upp så stänger jag av och låter det stå och puttra på eftervärmen, detta fungerar om man har en liten mindre mängd vatten, jag tycker även resultatet blir bättre då. Ta sedan och blanda i de frysta eller färska bären.
			</p>
			<p>
			
			</p>
			
		</div>
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