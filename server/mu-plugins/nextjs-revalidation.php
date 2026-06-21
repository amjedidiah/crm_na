<?php
/**
 * Plugin Name: CRM NA Next.js Revalidation
 * Description: Sends a revalidation request to the Next.js frontend after supported content changes.
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Supported post types for this phase.
 * Keys are WordPress post_type slugs; values are sent to Next.js as post_type.
 */
const CRM_NA_REVALIDATION_POST_TYPES = [
	'church'     => 'church',
	'leader'     => 'leader',
	'ministry'   => 'ministry',
	'event'      => 'event',
	'media_item' => 'media_item',
	'page'       => 'page',
];

add_action('save_post', function (int $post_id, WP_Post $post): void {
	if (
		wp_is_post_revision($post_id) ||
		wp_is_post_autosave($post_id) ||
		$post->post_status !== 'publish'
	) {
		return;
	}

	if (!array_key_exists($post->post_type, CRM_NA_REVALIDATION_POST_TYPES)) {
		return;
	}

	$frontend = getenv('NEXT_PUBLIC_SITE_URL');
	$secret = getenv('REVALIDATE_SECRET');

	if (!$frontend || !$secret) {
		return;
	}

	wp_remote_post(
		trailingslashit($frontend) . 'api/revalidate?secret=' . rawurlencode($secret),
		[
			'body'     => wp_json_encode([
				'post_type' => CRM_NA_REVALIDATION_POST_TYPES[$post->post_type],
				'slug'      => $post->post_name,
			]),
			'headers'  => ['Content-Type' => 'application/json'],
			'timeout'  => 5,
			'blocking' => false,
		]
	);
}, 10, 2);
