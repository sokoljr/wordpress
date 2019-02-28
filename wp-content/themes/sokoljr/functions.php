<?php

global $wp_query;

/**
 * Require ACF configs
 */
require_once 'inc/acf.php';

/**
 * Init scripts and styles
 */
require_once 'inc/init.php';

/**
 * Post types
 */
require_once 'inc/post-types/index.php';

/**
 * Define theme constants
 */
define( 'SOKOLJR_THEME_VERSION', 0.1 );

show_admin_bar( false );

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

/**
 * Function, that require svg-file and return or print it
 *
 * @param string $filename - file name excluding file extension
 * @param bool $return - true == include file || false == return path
 * @param bool $content - returns SVG inner content
 * @param string $dir - if svg files directory not eq. "svg" - set target directory related to theme root
 *
 * @return string/void
 *
 * @since       1.0.0
 * @author      Serhii Sokol
 */
function svg($filename, $return = false, $content = true, $dir = 'assets/dist/svg')
{
	$dir = mb_substr($dir, 0, 1) == '/' ? mb_substr($dir, 1, mb_strlen($dir)) : $dir;
	$dir = mb_substr($dir, -1, 1) == '/' ? mb_substr($dir, 0, mb_strlen($dir) - 1) : $dir;
	$path = get_template_directory() . '/' . $dir . '/' . $filename . '.svg';

	if ($return == false) {
		@require $path;
	} else {
		if ($content = true) {
			return file_get_contents($path);
		} else {
			return $path;
		}
	}
}

function svg_media_uploads( $src ) {
	echo '<img src="' . $src . '" />';
}

/**
 * PHP Wordpress Removing Contact Form 7 Br tags
 */
add_filter( 'wpcf7_autop_or_not', '__return_false' );

function do_excerpt_title($string, $length) {
	if ( strlen($string) <= $length ) {
		echo $string;
	} else {
		echo substr($string, 0, $length) . '...';
	}
}