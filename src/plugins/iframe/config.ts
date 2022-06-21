/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/iframe
 */

import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		/**
		 * When this option is enabled, the editor's content will be placed in an iframe and isolated from the rest of the page.
		 *
		 * @example
		 * ```javascript
		 * Zodit.make('#editor', {
		 *    iframe: true,
		 *    iframeStyle: 'html{margin: 0px;}body{padding:10px;background:transparent;color:#000;position:relative;z-index:2;\
		 *    user-select:auto;margin:0px;overflow:hidden;}body:after{content:"";clear:both;display:block}';
		 * });
		 * ```
		 */
		iframe: boolean;

		/**
		 * Allow editing the entire HTML document(html, head)
		 */
		editHTMLDocumentMode: boolean;

		/**
		 * You can redefine default page
		 *
		 * @example
		 * ```javascript
		 * new Zodit('#editor', {
		 *    iframe: true,
		 *    iframeDefaultSrc: 'http://techzolab.net/opensource/zodit/docs/',
		 * });
		 * ```
		 */
		iframeDefaultSrc: string;

		/**
		 * Base URL where the root directory for {@link Zodit.defaultOptions.iframe|iframe} mode
		 *
		 * @example
		 * ```javascript
		 * new Zodit('#editor', {
		 *    iframe: true,
		 *    iframeBaseUrl: 'http://techzolab.net/opensource/zodit/docs/',
		 * });
		 * ```
		 */
		iframeBaseUrl: string;

		/**
		 * Iframe title's content
		 */
		iframeTitle: string;

		/**
		 * Iframe's DOCTYPE
		 */
		iframeDoctype: string;

		/**
		 * Custom style to be used inside the iframe to display content.
		 * @example
		 * ```javascript
		 * new Zodit('#editor', {
		 *    iframe: true,
		 *    iframeStyle: 'html{margin: 0px;}',
		 * })
		 * ```
		 */
		iframeStyle: string;

		/**
		 * Custom stylesheet files to be used inside the iframe to display content.
		 *
		 * @example
		 * ```javascript
		 * new Zodit('#editor', {
		 *    iframe: true,
		 *    iframeCSSLinks: ['styles/default.css'],
		 * })
		 * ```
		 */
		iframeCSSLinks: string[];
	}
}

Config.prototype.iframe = false;
Config.prototype.iframeBaseUrl = '';
Config.prototype.iframeTitle = 'Zodit Editor';
Config.prototype.iframeDoctype = '<!DOCTYPE html>';
Config.prototype.iframeDefaultSrc = 'about:blank';
Config.prototype.iframeStyle =
	'html{' +
	'margin:0;' +
	'padding:0;' +
	'min-height: 100%;' +
	'}' +
	'body{' +
	'box-sizing:border-box;' +
	'font-size:13px;' +
	'line-height:1.6;' +
	'padding:10px;' +
	'margin:0;' +
	'background:transparent;' +
	'color:#000;' +
	'position:' +
	'relative;' +
	'z-index:2;' +
	'user-select:auto;' +
	'margin:0px;' +
	'overflow:auto;' +
	'outline:none;' +
	'}' +
	'table{' +
	'width:100%;' +
	'border:none;' +
	'border-collapse:collapse;' +
	'empty-cells: show;' +
	'max-width: 100%;' +
	'}' +
	'th,td{' +
	'padding: 2px 5px;' +
	'border:1px solid #ccc;' +
	'-webkit-user-select:text;' +
	'-moz-user-select:text;' +
	'-ms-user-select:text;' +
	'user-select:text' +
	'}' +
	'p{' +
	'margin-top:0;' +
	'}' +
	'.zodit_editor .zodit_iframe_wrapper{' +
	'display: block;' +
	'clear: both;' +
	'user-select: none;' +
	'position: relative;' +
	'}' +
	'.zodit_editor .zodit_iframe_wrapper:after {' +
	'position:absolute;' +
	'content:"";' +
	'z-index:1;' +
	'top:0;' +
	'left:0;' +
	'right: 0;' +
	'bottom: 0;' +
	'cursor: pointer;' +
	'display: block;' +
	'background: rgba(0, 0, 0, 0);' +
	'} ' +
	'.zodit_disabled{' +
	'user-select: none;' +
	'-o-user-select: none;' +
	'-moz-user-select: none;' +
	'-khtml-user-select: none;' +
	'-webkit-user-select: none;' +
	'-ms-user-select: none' +
	'}';
Config.prototype.iframeCSSLinks = [];
Config.prototype.editHTMLDocumentMode = false;
