/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/clipboard/paste
 */

import type { IControlType, IZodit, IUIOption } from 'zodit/types';
import type { InsertMode } from 'zodit/plugins/clipboard/paste/interface';
import {
	INSERT_AS_HTML,
	INSERT_AS_TEXT,
	INSERT_ONLY_TEXT,
	TEXT_PLAIN
} from 'zodit/core/constants';
import { Config } from 'zodit/config';
import { pluginKey as clipboardPluginKey } from '../clipboard';
import { pasteInsertHtml } from './helpers';
import { Alert } from 'zodit/modules/dialog/alert';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Ask before paste HTML in WYSIWYG mode
		 */
		askBeforePasteHTML: boolean;

		/**
		 * When the user inserts a piece of HTML, the plugin will ask - How to insert it.
		 * If after that user insert the same fragment again, the previous option will be used without extra question.
		 */
		memorizeChoiceWhenPasteFragment: boolean;

		/**
		 * Handle pasted text - similar to HTML
		 */
		processPasteHTML: boolean;

		/**
		 * Inserts HTML line breaks before all newlines in a string
		 */
		nl2brInPlainText: boolean;

		/**
		 * Default insert method
		 * @default insert_as_html
		 */
		defaultActionOnPaste: InsertMode;

		/**
		 * Draggable elements
		 */
		draggableTags: string | string[];

		/**
		 * Options when inserting HTML string
		 */
		pasteHTMLActionList: IUIOption[];
	}
}

Config.prototype.askBeforePasteHTML = true;
Config.prototype.processPasteHTML = true;

Config.prototype.pasteHTMLActionList = [
	{ value: INSERT_AS_HTML, text: 'Keep' },
	{ value: INSERT_AS_TEXT, text: 'Insert as Text' },
	{ value: INSERT_ONLY_TEXT, text: 'Insert only Text' }
];

Config.prototype.memorizeChoiceWhenPasteFragment = false;

Config.prototype.nl2brInPlainText = true;
Config.prototype.defaultActionOnPaste = INSERT_AS_HTML;

Config.prototype.draggableTags = ['img', 'zodit-media', 'zodit'];

const psKey = 'pasteStorage';

Config.prototype.controls.paste = {
	tooltip: 'Paste from clipboard',

	async exec(editor: IZodit, _, { control }) {
		if (control.name === psKey) {
			editor.execCommand('showPasteStorage');
			return;
		}

		editor.s.focus();

		let text = '',
			error = true;

		if (navigator.clipboard) {
			try {
				const items = await (navigator.clipboard as any).read();

				if (items && items.length) {
					const textBlob = await items[0].getType(TEXT_PLAIN);
					text = await new Response(textBlob).text();
				}

				error = false;
			} catch (e) {
				if (!isProd) {
					console.log(e);
				}
			}

			if (error) {
				try {
					text = await navigator.clipboard.readText();
					error = false;
				} catch (e) {
					if (!isProd) {
						console.log(e);
					}
				}
			}
		}

		if (error) {
			text = editor.buffer.get<string>(clipboardPluginKey) || '';
			error = text.length === 0;
		}

		const value = editor.value;

		if (error) {
			editor.ed.execCommand('paste');
			error = value === editor.value;
			!error && editor.e.fire('afterPaste');
		} else if (text.length) {
			pasteInsertHtml(null, editor, text);
			editor.e.fire('afterPaste');
		} else {
			if (error) {
				Alert(
					editor.i18n(
						"Your browser doesn't support direct access to the clipboard."
					),
					() => {
						editor.s.focus();
					}
				).bindDestruct(editor);
			}
		}
	},

	list: {
		[psKey]: 'Paste Storage'
	},

	isChildDisabled(j): boolean {
		return j.e.fire('pasteStorageList') < 2;
	}
} as IControlType;
