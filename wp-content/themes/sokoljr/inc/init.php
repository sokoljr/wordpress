<?php

/**
 * Load scripts and styles
 *
 * @link        http://developer.wordpress.org/reference/functions/wp_enqueue_script
 * @link        http://wp-kama.ru/function/wp_enqueue_script
 *
 * @package     WordPress
 * @subpackage  RST v3
 * @since       1.0.0
 * @author      Serhii Sokol
 */
function rst_load_assets()
{
	//Load scripts and styles only for frontend

	if( !is_admin() ) {

		//jQuery
		wp_deregister_script('jquery');

		wp_register_script( 'jquery', get_template_directory_uri() . '/assets/dist/js/libs/jquery.min.js', SOKOLJR_THEME_VERSION, true );

		// Styles
		wp_enqueue_style( 'app', get_template_directory_uri() . '/assets/dist/css/app.min.css', SOKOLJR_THEME_VERSION );

		// Scripts
		wp_enqueue_script( 'app', get_template_directory_uri() . '/assets/dist/js/app.min.js', array('jquery'), SOKOLJR_THEME_VERSION, true );

	}
}

add_action( 'wp', 'rst_load_assets' );