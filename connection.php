<?php
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="";
	$dbname="autism_db";
	$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
	if(!$con)
	{
		die("falied to connect!");
	}
?>