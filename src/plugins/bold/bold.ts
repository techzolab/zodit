/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/bold
 */

import type { IDictionary, IZodit, IControlType } from 'zodit/types';
import { Config } from 'zodit/config';
import { isArray } from 'zodit/core/helpers';

Config.prototype.controls.subscript = {
	tags: ['sub'],
	tooltip: 'subscript'
} as IControlType;

Config.prototype.controls.superscript = {
	tags: ['sup'],
	tooltip: 'superscript'
} as IControlType;

Config.prototype.controls.bold = {
	tagRegExp: /^(strong|b)$/i,
	tags: ['strong', 'b'],
	css: {
		'font-weight': ['bold', '700']
	},
	tooltip: 'Bold'
} as IControlType;

Config.prototype.controls.italic = {
	tagRegExp: /^(em|i)$/i,
	tags: ['em', 'i'],
	css: {
		'font-style': 'italic'
	},
	tooltip: 'Italic'
} as IControlType;

Config.prototype.controls.underline = {
	tagRegExp: /^(u)$/i,
	tags: ['u'],
	css: {
		'text-decoration-line': 'underline'
	},
	tooltip: 'Underline'
} as IControlType;

Config.prototype.controls.strikethrough = {
	tagRegExp: /^(s)$/i,
	tags: ['s'],
	css: {
		'text-decoration-line': 'line-through'
	},
	tooltip: 'Strike through'
} as IControlType;

/**
 * Adds `bold`,` strikethrough`, `underline` and` italic` buttons to Zodit
 */
export function bold(editor: IZodit): void {
	const callBack = (command: string): false => {
		const control: IControlType = Config.defaultOptions.controls[
				command
			] as IControlType,
			cssOptions:
				| IDictionary<string | string[]>
				| IDictionary<(editor: IZodit, value: string) => boolean> = {
				...control.css
			},
			cssRules: IDictionary<string> = {};

		Object.keys(cssOptions).forEach((key: string) => {
			cssRules[key] = isArray(cssOptions[key])
				? (cssOptions[key] as any)[0]
				: cssOptions[key];
		});

		editor.s.applyStyle(cssRules, {
			element: control.tags ? control.tags[0] : undefined
		});

		editor.e.fire('synchro');

		return false;
	};

	['bold', 'italic', 'underline', 'strikethrough'].forEach(name => {
		editor.registerButton({
			name,
			group: 'font-style'
		});
	});

	['superscript', 'subscript'].forEach(name => {
		editor.registerButton({
			name,
			group: 'script'
		});
	});

	editor
		.registerCommand('bold', {
			exec: callBack,
			hotkeys: ['ctrl+b', 'cmd+b']
		})

		.registerCommand('italic', {
			exec: callBack,
			hotkeys: ['ctrl+i', 'cmd+i']
		})

		.registerCommand('underline', {
			exec: callBack,
			hotkeys: ['ctrl+u', 'cmd+u']
		})

		.registerCommand('strikethrough', {
			exec: callBack
		});
}
