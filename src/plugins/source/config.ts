/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/source
 */

import type { IControlType, IZodit, ISourceEditor } from 'zodit/types';
import { Config } from 'zodit/config';
import * as consts from 'zodit/core/constants';
import { IS_IE } from 'zodit/core/constants';

declare module 'zodit/config' {
	interface Config {
		sourceEditor: 'area' | 'ace' | ((zodit: IZodit) => ISourceEditor);

		/**
		 * Options for [ace](https://ace.c9.io/#config) editor
		 * @example
		 * ```js
		 * Zodit.make('#editor', {
		 * 	showGutter: true,
		 * 	theme: 'ace/theme/idle_fingers',
		 * 	mode: 'ace/mode/html',
		 * 	wrap: true,
§		 * 	highlightActiveLine: true
		 * })
		 * ```
		 */
		sourceEditorNativeOptions: {
			showGutter: boolean;
			theme: string;
			mode: string;
			wrap: string | boolean | number;
			highlightActiveLine: boolean;
		};

		/**
		 * Beautify HTML then it possible
		 */
		beautifyHTML: boolean;

		/**
		 * CDN URLs for HTML Beautifier
		 */
		beautifyHTMLCDNUrlsJS: string[];

		/**
		 * CDN URLs for ACE editor
		 */
		sourceEditorCDNUrlsJS: string[];
	}
}

Config.prototype.beautifyHTML = !IS_IE;
Config.prototype.sourceEditor = 'ace';

Config.prototype.sourceEditorNativeOptions = {
	/**
	 * Show gutter
	 */
	showGutter: true,

	/**
	 * Default theme
	 */
	theme: 'ace/theme/idle_fingers',

	/**
	 * Default mode
	 */
	mode: 'ace/mode/html',

	/**
	 * Wrap lines. Possible values - "off", 80-100..., true, "free"
	 */
	wrap: true,

	/**
	 * Highlight active line
	 */
	highlightActiveLine: true
};

Config.prototype.sourceEditorCDNUrlsJS = [
	'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js'
];

Config.prototype.beautifyHTMLCDNUrlsJS = [
	'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify-html.min.js'
];

Config.prototype.controls.source = {
	mode: consts.MODE_SPLIT,

	exec: (editor: IZodit) => {
		editor.toggleMode();
	},

	isActive: (editor: IZodit) => {
		return editor.getRealMode() === consts.MODE_SOURCE;
	},

	tooltip: 'Change mode'
} as IControlType;
