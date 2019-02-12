<?php

global $wp_query;

function acf_plugin_updates( $value ) {
    unset( $value->response['advanced-custom-fields-pro/acf.php'] );
    return $value;
}

add_filter( 'site_transient_update_plugins', 'acf_plugin_updates' );

/**
 * Require ACF configs
 */
require_once 'inc/acf.php';

/**
 * Define theme constants
 */
define( 'SOKOLJR_THEME_VERSION', 0.1 );

show_admin_bar( false );

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
    //--- Load scripts and styles only for frontend: -----------------------------
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

/**
 * setup
 */
function sokoljr_setup() {
    register_nav_menus( array(
        'top' => 'Top menu',
    ));

    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
}


add_action( 'after_setup_theme', 'sokoljr_setup' );