<?php
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