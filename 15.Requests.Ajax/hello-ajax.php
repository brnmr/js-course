<?php
	$name = 'First Name';
	$lname = 'Last Name';
	$alias = 'Alias';
	if ( isset( $_REQUEST['name'] ) ) {
	  $name = $_REQUEST['name'];
	};
	if ( isset( $_REQUEST['lname'] ) ) {
	  $lname = $_REQUEST['lname'];
	};
	if ( isset( $_REQUEST['alias'] ) ) {
	  $alias = $_REQUEST['alias'];
	};
?>
<h1>Hello, <?= $name . ' ' . $lname . ' (' . $alias . ')' ?>!</h1>

<h2>GET params dump</h2>
<pre><?php var_dump( $_GET ); ?></pre>

<h2>POST params dump</h2>
<pre><?php var_dump( $_POST ); ?></pre>