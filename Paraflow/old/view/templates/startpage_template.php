<?php

function get_document_head()
{

$title = 'Bloggatourius'; 
$css_file = 'view/templates/css/style.css';
$java_script = 'js/scripts.js';
    
$output='';
$output = <<<OUT
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml"> 
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<title>Bloggie</title> 
		<link rel="stylesheet" type="text/css" href="view/templates/css/style_startpage.css"/>
		<script type="text/javascript" src="js/scripts.js"></script>
	</head>
	<body>
OUT;
   return $output;
}

function get_topbar_logged_in($page = '1')
{
    $output='';
    $username = $_SESSION['user_name'];
    
    $output = <<<OUT
		<div id="topbar">
			<div id="topbar_content">
				<img src="view/templates/img/logo.png" width="230" height="28" alt="logo"/> 
				<ul id="top_nav">
					<li><a href="index.php">Home</a></li>
					<li><a href="index.php?page=$page&amp;admin_page=myblogs">Mina Bloggar</a></li>
				</ul>
				<form id="loginform" action='controller/form_handler.php' method="post">
					<ul class="login">
						<li>
							<label for="logout" class="hidden">Logout</label>
							<input id="logout" type="submit" value="Logout" name="submit"/>
							<input type="hidden" value="logout" name="_get_function" id="_get_function"/>    
						</li>
					</ul>             
				</form> 
			</div><!-- #topbar_content -->
	   </div><!-- #topbar -->
OUT;
             
   return $output;
   
}


function get_topbar($page = '1')
{

    $output='';
    
            $output = <<<OUT
			<div id="topbar">
				<div id="topbar_content">
					<img src="view/templates/img/logo.png" width="230" height="28" alt="logo"/> 
					<ul id="top_nav">
						<li><a href="index.php">Home</a></li>
						<li id="signupform"><a href="?signupform=true">Sign Up</a></li>
					</ul>
		
					<form id="loginform" action="controller/form_handler.php" method="post">
						<ul class="login">
							<li>
								<label for="email">E-mail</label>
								<input type="text" value="" size="16" name="email" id="email"/>
							</li>
							<li>
								<label for="password">Password</label>
						 		<input type="password" value="" size="16" name="password" id="password"/>
						 	</li>
						 	<li>
								<label for="login" class="hidden">Login</label>
								<input id="login" type="submit" value="Log in" name="submit"/>
							</li>
							<li>
								<input type="hidden" value="login" name="_get_function" id="_get_function"/>
							</li>
						</ul>
					</form> 
				</div><!-- #topbar_content -->
			</div><!-- #topbar -->
OUT;
             
   
   return $output;
    
           
}

function get_registrationform()
{

    $output='';
    

   return $output;

}

function get_content_wrapper()
{
    return '<div id="container">
		    	<div id="blog">
		    ';
}

function get_post($from_blog = '',$title = 'POST1', $date = 'nu', $post = 'blabla', $author = 'Micke', $category = 'Test', $page='')
{
        $output = '';
        
        $output = <<<OUT
        <div class="blog_post"> 
			<h2>$title</h2>
			<div class="post">
				<span class="headline">Från <a href="index.php?page=$from_blog">$from_blog</a> | Publiserad $date i kategorin <a href="index.php?page=$page&amp;category=$category">$category</a></span>
				<p>$post</p>
			</div><ul>
OUT;

   return $output;
}

function get_comment_container($commentscounter)
{

    return "</ul><div class='commentscontainer' id='commentscontainer$commentscounter'>
            <div id='getheight$commentscounter'>";

}

function get_showhide_comments($commentscounter, $comments_count)
{

    return "<span class='showcomments' id='showcomments$commentscounter'>Visa kommentarer ($comments_count)</span>
            <span class='hidecomments' id='hidecomments$commentscounter'>Dölj kommentarer ($comments_count)</span>";

}

function get_showhide_comments_nocomment($commentscounter)
{

    return "<span class='showcomments' id='showcomments$commentscounter'>Skriv kommentar</span>
            <span class='hidecomments' id='hidecomments$commentscounter'>Dölj formulär</span>";

}

function get_tag($page, $tag, $textsize = '100%')
{

    return "<li class='tags'><a href='index.php?page=$page&amp;tag=$tag' style='font-size:$textsize'>$tag</a></li> ";

}


function get_comment_container_close()
{

    return "</div> <!-- #getheight -->
            </div> <!-- #commentscontainer -->";

}

function get_comment($author='',$email='',$webpage='',$date='', $comment='')
{
        $output = '';
        
        $output = <<<OUT
       <div class="comments">
			<ul>
				<li class="name_and_date">
					<a href="mailto:$email">$author</a> - $date
				</li>
				<li class="webpage">
					$webpage
				</li>
				<li>
					$comment
				</li>
			</ul>
		</div>
OUT;

   return $output;

}

function get_comment_form($id,$page)
{
        $output = '';
            $output = <<<OUT
            <hr />
			<div class="commentformcontainer">
				<form  method='post' action="controller/form_handler.php?page=$page">
		            <dl>
		            	<dt>
		            		<label for="name$id">Namn</label>
		            	</dt>
		                    <dd>
		                    	<input type='text' class='form' id='name$id' size='40' name='name'/>
		                    </dd>
		                <dt>
		                	<label for="email$id">E-Post</label>
		                </dt>
		                    <dd>
		                    	<input type='text' class='form' id='email$id' size='40' name='email' />
		                    </dd>
		                <dt>
		                	<label for="url$id">Hemsida (Frivilligt)</label>'
		                </dt>
		                    <dd>
		                    	<input type='text'  id='url$id' size='40' name='url' class='no_validation' />
		                    </dd>
		                <dt>
		                	<label for="text$id">Meddelande</label>
		                </dt>
		                    <dd>
		                    	<textarea name='text' class='form' id='text$id' rows='5' cols='50'></textarea>
		                    </dd>            
						<dt>
							<input type="hidden" value="add comment" id="task$id" />
		                    <input type="hidden" name="post_id" id="post_id$id" value="$id" />	            
				            <input type="hidden" name="_get_function" id="_get_function$id" value="new_comment" />
		                	<label for="button$id" class="hidden">Kommentera</label>
				            <input id="button$id" type='submit' value='Kommentera'/>
		            	</dt>
		            </dl>
		       	</form>
		    </div>
OUT;

   return $output;

}


function get_post_close()
{

    return '</div><!-- #blog_post -->';
    
}

function get_sidebar_container()
{

    return '</div><!-- #blog -->
            <div id="sidebar">';

}


function get_tagcloud_container()
{   

    return '<div id="tag_cloud"><ul>';
    
}

function get_tagcloud_close($title_text)
{

    return '</ul></div><!-- #tag_cloud -->
            <h1>'.$title_text.'</h1><br />';

}

function get_paging_container()
{

    return "<div class='paging_container'><ul>";

}

function get_paging_container_close()
{

    return "</ul></div> <!-- #paging_container -->";

}

function get_next_page_link($page, $page_nr)
{

    return "<li><a href='index.php?page=$page&amp;page_nr=$page_nr' class='paging_item'>-&gt;</a></li>";

}

function get_prev_page_link($page, $page_nr)
{

    return "<li><a href='index.php?page=$page&amp;page_nr=$page_nr' class='paging_item'>&lt;-</a></li>";

}

function get_page_link($page, $page_nr)
{

    return "<li><a href='index.php?page=$page&amp;page_nr=$page_nr' class='paging_item'>$page_nr</a></li>";

}

function get_sidebar_menu_open($title)
{

   return "<div class='sidebar_menu_container'><h3>$title</h3> 
           <ul>"; 
}

function get_sidebar_menu_category_item($page, $category, $nr_of_posts)
{

    return "<li><a href='index.php?page=$page&amp;category=$category'>$category($nr_of_posts)</a></li>";

}

function get_sidebar_menu_month_item($page, $month, $nr_of_posts)
{

    return "<li><a href='index.php?page=$page&amp;month=$month'>$month($nr_of_posts)</a></li>";

}

function get_sidebar_menu_blog_item($blog_url,$blog_name)
{

    return "<li><a href='index.php?page=$blog_url'>$blog_name</a></li>";

}


function get_sidebar_menu_close()
{

   return "</ul></div>"; 
}


function get_sidebar_close()
{
	return "</div> <!-- #sidebar -->";
	
}


function get_document_foot()
{
    
$output='';
    
             $output = <<<OUT
    
       <div id="footer">
	   </div>	
	   </div><!-- #container -->
       </body>
       </html>
OUT;

return $output;
    
}

function signupform()
{
$output='';
    
$output = <<<OUT
		<div id="registercontainer">
		    <div id="register">
		    	<a href="index.php">Stäng</a>
		    	<h1>Regristrering</h1>
		        <form method="post" action="controller/form_handler.php">
		        
		        <div id='left'>
		            <dl>
		                <dt>
		                	<label for="first_name">
		                		Förnamn
		                	</label>
		                </dt>
		                	<dd>
		                		<input type="text" id="first_name" name="first_name"/>
		                	</dd>
		                <dt>
		               		<label for="last_name">
		                		Efternamn
		                	<label>
		                </dt>
		                	<dd>
		                		<input type="text" id="last_name" name="last_name"/>
		                	</dd>
		                <dt>
		                	<label for="email">
		                		E-Post
		                	</label>
		                </dt>
		                <dd>
		                	<input type="text" id="email" name="email"/>
		                </dd>  
		                <dt>
		                	<label for="password">
		                		Lösenord
		                	</label>
		                </dt>
		                <dd>
		                	<input type="password" id="password" name="password"/>
		                </dd>  
		                <dt>
		                	<label for="password2">
		                		Upprepa Lösenordet
		                	</label>
		                </dt>
		                <dd>
		                	<input type="password" id="password2" name="password2"/>
		                </dd>
		            </dl>
		        </div>
		        <div id='right'>
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum		            
					<dl>
		                <dt>
		                	<label for="accept">
		                		<input name="accept" id="accept" class="no_validation" type="checkbox" value=""/> Acceptera
		                	</label>
		                </dt>
		            </dl>
		        </div>
		        <label for="register_button" class="hidden">
		        	Regristrera
		        </label>
		        	<input type="hidden" name="_get_function" value="add_user" id="_get_function"/>
		        <div id='buttonpossision'><input id="register_button" class="rbutton" type="submit" value="Regristrera"/> </div>
		        </form>
		         
		    </div>
		</div>
OUT;

return $output;
}

?>
