<?php
session_start();
require_once('controller/init.php');
require_once('controller/page.php');
require_once('model/db.php');

$page= isset($_GET['p'])?$_GET['p']:'0';

show_page($page);