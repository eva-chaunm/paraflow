<?php


function is_admin()
{

    if (isset($_SESSION['user_name']) && $_SESSION['user_name'] == 'admin')
        return 1;
    else
        return 0;

}

function is_owner($blogname)
{
    if($blogname != '1') //If we dont need a blogname, use page = 1 and it will pass is_owner
    {
        $blog_list = get_users_blog_list();
        $owner = 0;
        
        foreach ($blog_list as $blog)
        {
            if($blog['name'] == $blogname)
                $owner = 1;
        }
        
        return $owner;
    }
    else
        return 1;
}

function is_logged_in()
{

    if (isset($_SESSION['user_id']))
    {
    
        return 1;
    
    }
    else
    {
    
        return 0;
    
    }

}

function get_users_blog_list()
{
    return unserialize($_SESSION['blog_list']);
}




