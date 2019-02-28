<?php

/**
 * Add Custom fields
 */
if ( function_exists( 'acf_add_local_field_group' ) ) {
	require_once 'acf/option.php';
}

/**
 * Add ACF PRO OPTION PAGE
 */
if (current_user_can('administrator')) {
	if(function_exists('acf_add_options_page')) {
		acf_add_options_page();
	}
}

/**
 * ACF map API
 */
function map_acf_init() {

	acf_update_setting('google_api_key', 'xxx');
}

add_action('acf/init', 'map_acf_init');

/**
 * No Update Plugin
 */
function acf_plugin_updates( $value ) {
	unset( $value->response['advanced-custom-fields-pro/acf.php'] );
	return $value;
}

add_filter( 'site_transient_update_plugins', 'acf_plugin_updates' );
