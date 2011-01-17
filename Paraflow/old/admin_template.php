<?php

function get_head()
{

return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Adminpage</title>
        <link rel="stylesheet" href="view/templates/css/style_admin.css" />
        <script type="text/javascript" src="js/scripts.js"></script>
        <script type="text/javascript" src="js/lib/wyzz.js"></script>

    </head>    
    <body>
    
      <div id="topbar">
        <div id="topbar_content">
            <img src="view/templates/img/logo.png" width="230" height="28" alt="logo"/> 
            <ul id="top_nav">
                <li><a href="index.php">Home</a></li>
                <li><a href="index.php?page=1&admin_page=myblogs">Mina bloggar</a></li>
            </ul>
                
                <form id="logout" action="controller/form_handler.php" method="post">
                <input type="submit" value="Logout" name="submit" />
                <input type="hidden" value="logout" name="_get_function" id="_get_function">
            </form> 
        </div><!-- #topbar_content -->
       </div><!-- #topbar -->
    
    
        <div id = "center_all">';

}

function get_container()
{

return '<div id="content">';

}

function get_menu($page)
{
return '    <div id="menycontainer"> 
                <ul> 
                    <li><a href="index.php?page='.$page.'&admin_page=newpost" id="current">Nytt inlägg</a></li>
                    <li><a href="index.php?page='.$page.'&admin_page=archive">Arkiv</a></li>
                    <li><a href="index.php?page='.$page.'&admin_page=design">Design</a></li>
                    <li><a href="index.php?page='.$page.'&admin_page=settings">Inställningar</a></li> 
                </ul> 
            </div>';


}         

function get_new_post_form($page,$year,$month,$day,$hour,$minute)
{
return '        
            <div class="admincontainer"> 
                <h1>Skapa nytt inlägg</h1>   
                <form class="formstyle" action="controller/form_handler.php?page='. $page . '" method="post">
                    <div class="adminleft">
                        <dl>
                            <dt>Text</dt>
                            <dd><textarea name="post" id="post" rows="25" cols="70">Skriv ditt inlägg här...</textarea></dd>
                        </dl>
                    </div><!-- #adminleft -->
                    <div class="adminright">
                        <dl>
                            <dt>Rubrik</dt>
                            <dd><input type="text" value="" size="40" id="title" name="title" /></dd>
                            <dt>Taggar(valfritt)</dt>
                            <dd><input type="text" value="" size="40" id="tags" name="tags" class="no_validation" /></dd>
                            <dt>Kategori</dt>
                            <dd>
                                <select name="category" id="category">
                                    <option value="1">Övrigt</option>
                                    <option value="2">Fritid</option>
                                    <option value="3">Arbete</option>
                                    <option value="4">Skola</option>
                                    <option value="5">Vetenskap</option>
                                    <option value="6">Teknik</option>
                                    <option value="7">Personligt</option>
                                    <option value="8">Mode</option>
                                </select>
                            </dd>
                            <dt>Välj datum för publisering</dt>
                            <dd>'.$year.' - '.$month.' - '.$day.' ? '.$hour.':'.$minute.'</dd>
                            <dt>Alternativ</dt>
                            <dd><input type="radio" checked name="action" value="publish">Publisera NU </dd>
                            
                            <dd><input type="radio" name="action" value="publishdate">Publisera valt DATUM </dd>
                            
                            <dd><input type="radio" name="action" value="save">Spara som UTKAST</dd>
                            
                            <dt><input type="submit" value="Spara" /></dt>
                            <input type="hidden" name="blog_name" id="blog_name" value="'.$page.'" />
                            
                            <input type="hidden" name="_get_function" id="_get_function" value="new_post" />
                        </dl>
                    </div><!-- #adminright -->
                </form>
                </div><!-- #admincontainer -->';  

}            
     
function get_new_blog_form()
{

return '         
            <div class="admincontainer"> 
               <div class="adminleft">
                    <h1>Skapa ny Blogg</h1>
                    <form class="formstyle" action="controller/form_handler.php" method="post">
                    <dl>
                        <dt>Namn på bloggen</dt>
                        <dd><input type="text" value="" id="blog_name" name="blog_name" /></dd>  
                    	<dd>Tillåtna tecken: <strong>A-Ö och 0-9 samt mellanrum</strong></dd>
                    	<dd></dd>
                        <dt><input type="submit" value="Skapa" /></dt>
                        <input type="hidden" name="publiced" id="publiced" value="1" /><br>
                        <input type="hidden" name="_get_function" id="_get_function" value="new_blog" /><br>
                    </dl>
                </form>
              </div>
             </div>
                '; 

}

function archive_container_start()
{
return '<div class="admincontainer">
            <h1>Poster</h1>
            <div class="adminleft">
                ';  
}

function archive_posts_open($title)
{

    return "<ul><h2>$title</h2>";

}

function archive_posts_close()
{

    return '</ul>';

}

function archive_posts_draft($page,$id,$title) 
{
return '            <li><a href="index.php?page=' . $page . '&admin_page=edit_post&postid=' . $id . '">' . $title . '</a></li>';
}

function archive_posts_waiting($page,$id,$title,$publish_date) 
{
return '            <li><a href="index.php?page=' . $page . '&admin_page=edit_post&postid=' . $id . '">' . $title . '</a> - ' . $publish_date . '</li>';
}

function archive_posts($page,$id,$title,$comments) 
{
return '            <li><a href="index.php?page=' . $page . '&admin_page=edit_post&postid=' . $id . '">' . $title . '</a>' . $comments . '</li>';
}

function archive_statics ($totalposts,$totalcomments,$commentsperpost,$draftcounter) //stänger adrhive_container också, kanske ska ha en separat för det?!
{
return '
            </div>
            <div class="adminright">
                <ul>
                    <li>Totalt antal poster: '.$totalposts.'</li>
                    <li>Totalt antal kommentarer: '.$totalcomments.'</li>
                    <li>Kommentarer per post: '.$commentsperpost.'</li>
                    <li>Totalt antal sparade utkast: '.$draftcounter.'</li>
                    
                </ul>
            </div>
        </div>';
}


function post_container($title,$post,$date) {
return '<div class="admincontainer">
            <div class="adminleft">
            <h1>Inlägg</h1
            <h2>'.$title.'</h2>
            <h3>'.$date.'</h3>
            <p>'.$post.'</p>
            </div>
            ';
}



function start_comments_container() {
return '<div class="adminright">
            <h1>Kommentarer</h1
            ';
}

function get_comment($page = '',$author='',$email='',$webpage='',$date='', $comment='', $commentid='', $postid='')
{
        $output = '';
        
        $output = <<<OUT
       <div class="comments">
            <form action="controller/form_handler.php?page=$page&comment_id=$commentid&post_id=$postid" method="post">
            <input type="hidden" id="_get_function" name="_get_function" value="hide_comment" />
            <button type="submit">Göm kommentar</button>
            </form>
            <span><a href="mailto:$email">$author</a></span> - <span>$date</span><br />
            <span>$webpage</span>
            <p> $comment </p>
        </div>
OUT;

   return $output;

}


function get_comment_hidden($page='',$author='',$email='',$webpage='',$date='', $comment='', $commentid='', $postid='')
{
        $output = '';
        
        $output = <<<OUT
       <div class="hidden_comments">
            <form action="controller/form_handler.php?page=$page&comment_id=$commentid&post_id=$postid" method="post">
            <input type="hidden" id="_get_function" name="_get_function" value="show_comment" />
            <button type="submit">Visa kommentar</button>
            </form>
            <span><a href="mailto:$email">$author</a></span> - <span>$date</span><br />
            <span>$webpage</span>
            <p> $comment </p>
        </div>
OUT;

   return $output;

}



function close_comments_container() {
return '
            </div>
        </div>';
}




function get_edit_post($page,$post_id,$title,$text,$postid,$year,$month,$day,$hour,$minute,$tags,$categories_id)
{     
return '    <div class="admincontainer"> 
                <form class="formstyle" action="controller/form_handler.php" method="post">
                <h1>Redigera inlägg</h1>    
                    <div class="adminleft">
                        
                        <dl>
                            <dt>Text</dt>
                            <dd><textarea name="post" id="post" rows="20" cols="70">'.$text.'</textarea></dd>
                        </dl>
                    </div><!-- #adminleft -->
                    <div class="adminright">
                        <dl>
                            <dt>Rubrik</dt>
                            <dd><input type="text" value="'.$title.'" size="40" id="title" name="title" /></dd>
                            <dt>Taggar</dt>
                            <dd><input type="text" value="'.$tags.'"  size="40" id="tags" name="tags" class="no_validation" /></dd>
                            <dt>Kategori</dt>
                            <dd>
                            
                            '.$categories_id.'
                            </dd>
                            <dt>Välj datum för publisering</dt>
                            <dd>'.$year.' - '.$month.' - '.$day.' ? '.$hour.':'.$minute.'</dd>
                            <dt>Alternativ</dt>
                            <dd><input type="radio" checked name="action" value="publish">Publisera NU <input type="radio" name="action" value="publishdate">Publisera valt DATUM</dd>
                            <dd><input type="radio" name="action" value="save">Spara som UTKAST <input type="radio" name="action" value="delete">RADERA posten</dd>                         
                            <input type="hidden" name="post_id" id="post_id" value="'.$post_id.'" />
                            <input type="hidden" name="oldtags" id="oldtags" value="'.$tags.'" />
                            <input type="hidden" name="blog_name" id="blog_name" value="'.$page.'" />
                            <input type="hidden" name="_get_function" id="_get_function" value="update_post" />
                            <dt><input type="submit" value="Initsiera!" /></dt>

                        </dl>
                    </div><!-- #adminright -->
                </form>
                </div><!-- #admincontainer -->';  

}       

function get_design($page)
{

    return '<div class="admincontainer"> 
               <div class="adminleft">
                    <h1>Välj design</h1>
                    <p>Muhhahahah, tyvärr ingen annan design att välja på för tillfället!!! </p>
                    </div>
                </div>';

}

function get_settings($page)
{

    return '<div class="admincontainer"> 
               <div class="adminleft">
                    <h1>Inställningar</h1>
                    <h2>Publisering</h2>
                    <ul>
                    	<li>Publisera bloggen</li>
                    	<li>Kräv lösenord för läsning</li>                       	
                   	</ul>          
                    <h2>Delning</h2>
                    <ul>
                    	<li>Dela bloggen med andra</li>
                    	<li>Lösenord för delning</li>                       	
                   	</ul>
                   
                    <h2>Kommentarer</h2>
                    <ul>
                    	<li>Tillåt kommentarer</li>
                    	<li>Tillåt kommentarer endast av inloggade användare</li>
                    	<li>Meddela mig vid kommentarer</li>
                   	</ul>
                    <h2>Ta bort bloggen</h2>
                    </div>
                </div>';

}

function get_design_container_open($page)
{

$output = '';
    $output = <<<OUT
        <div class="admincontainer"> 
        <h1>Välj design</h1>
        <form action="controller/form_handler.php?page=$page" method="post">

OUT;
return $output;
}
                
                                    
function get_design_item($img, $template)
{
        $output = '';
        
        $output = <<<OUT
    <label for="$template">
    <img src="$img" alt="$template image" />
    </label>
    <input type="radio" id="$template" name="template" value="$template" />

OUT;

return $output;

}                
                
function  get_design_container_close()
{
        $output = '';
        
        $output = <<<OUT
    <input type="hidden" name="_get_function" id="_get_function" value="change_template" />
    <p><input type="submit" value="Bekräfta" /></p>
    </form></div>
OUT;

return $output;

}




         
function get_foot()
{

return '    </div>
        </div>
    </body> 
</html>';

}            

