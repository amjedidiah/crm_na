<?php
/**
 * Plugin Name: CRM NA Next.js Revalidation
 * Description: Sends a revalidation request to the Next.js frontend after supported content changes.
 */

if (!defined('ABSPATH')) {
	exit;
}

function crm_na_revalidate_supported_post_type($post_type) {
	$supported = array('church', 'leader', 'ministry', 'event', 'media_item', 'publication', 'page');
	return in_array($post_type, $supported, true);
}

function crm_na_trigger_next_revalidation($post_id, $post) {
	if (wp_is_post_revision($post_id) || !crm_na_revalidate_supported_post_type($post->post_type)) {
		return;
	}

	$frontend = getenv('NEXT_PUBLIC_SITE_URL');
	$secret = getenv('REVALIDATE_SECRET');

	if (!$frontend || !$secret) {
		return;
	}

	wp_remote_post(
		trailingslashit($frontend) . 'api/revalidate?secret=' . rawurlencode($secret),
		array(
			'headers' => array('Content-Type' => 'application/json'),
			'body'    => wp_json_encode(array('path' => '/')),
			'timeout' => 10,
		)
	);
}

add_action('save_post', 'crm_na_trigger_next_revalidation', 10, 2);
