<?php

/**
 * Header file
 *
 * @package     WordPress
 * @subpackage  RST v3
 * @since       1.0.0
 * @author      Serhii Sokol
 */

?>

<!doctype html>
<html lang="<?php echo get_locale(); ?>">
<head>
    <title><?php echo wp_get_document_title(); ?></title>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header id="header" class="header <?php if( is_admin_bar_showing() ) echo 'header--pulled' ?> ">

</header>

