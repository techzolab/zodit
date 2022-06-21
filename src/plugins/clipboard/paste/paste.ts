/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:plugins/clipboard/paste/README.md]]
 * @packageDocumentation
 * @module plugins/clipboard/paste
 */

import type { IZodit } from 'zodit/types';
import type {
	InsertMode,
	PastedData,
	PastedValue,
	PasteEvent
} from './interface';
import { Plugin } from 'zodit/core/plugin';
import { getAllTypes, getDataTransfer, pasteInsertHtml } from './helpers';

import './config';

import {
	INSERT_AS_TEXT,
	INSERT_CLEAR_HTML,
	INSERT_ONLY_TEXT,
	TEXT_HTML,
	TEXT_PLAIN,
	TEXT_RTF
} from 'zodit/core/constants';

import {
	isHTML,
	isString,
	trim,
	cleanFromWord,
	htmlspecialchars,
	LimitedStack,
	nl2br,
	stripTags
} from 'zodit/core/helpers';

import { pluginKey as clipboardPluginKey } from '../clipboard';
import { Dom } from 'zodit/core/dom';
import { autobind } from 'zodit/core/decorators';

/**
 * Ask before paste HTML source
 */
export class paste extends Plugin {
	private pasteStack: LimitedStack<PastedValue> = new LimitedStack(20);

	/** @override **/
	protected afterInit(zodit: IZodit): void {
		zodit.e
			.on('paste.paste', this.onPaste)
			.on('pasteStack.paste', (item: PastedValue) =>
				this.pasteStack.push(item)
			);

		if (zodit.o.nl2brInPlainText) {
			this.j.e.on('processPaste.paste', this.onProcessPasteReplaceNl2Br);
		}
	}

	/** @override **/
	protected beforeDestruct(zodit: IZodit): void {
		zodit.e
			.off('paste.paste', this.onPaste)
			.off('processPaste.paste', this.onProcessPasteReplaceNl2Br)
			.off('.paste');
	}

	/**
	 * Paste event handler
	 */
	@autobind
	private onPaste(e: PasteEvent): void | false {
		try {
			if (
				this.customPasteProcess(e) === false ||
				this.j.e.fire('beforePaste', e) === false
			) {
				e.preventDefault();
				return false;
			}

			this.defaultPasteProcess(e);
		} finally {
			this.j.e.fire('afterPaste', e);
		}
	}

	/**
	 * Process before paste
	 */
	private customPasteProcess(e: PasteEvent): void | false {
		if (!this.j.o.processPasteHTML) {
			return;
		}

		const dt = getDataTransfer(e),
			texts: PastedData = {
				html: dt?.getData(TEXT_HTML),
				plain: dt?.getData(TEXT_PLAIN),
				rtf: dt?.getData(TEXT_RTF)
			};

		let key: keyof PastedData;

		for (key in texts) {
			const value = texts[key];

			if (
				isHTML(value) &&
				(this.j.e.fire('processHTML', e, value, texts) ||
					this.processHTML(e, value))
			) {
				return false;
			}
		}
	}

	/**
	 * Default paster process
	 */
	private defaultPasteProcess(e: PasteEvent): void {
		const dt = getDataTransfer(e);
		let text = dt?.getData(TEXT_HTML) || dt?.getData(TEXT_PLAIN);

		if (dt && text && trim(text) !== '') {
			const result = this.j.e.fire(
				'processPaste',
				e,
				text,
				getAllTypes(dt)
			);

			if (result !== undefined) {
				text = result;
			}

			if (isString(text) || Dom.isNode(text)) {
				this.insertByType(e, text, this.j.o.defaultActionOnPaste);
			}

			e.preventDefault();
			e.stopPropagation();
		}
	}

	/**
	 * The dialog box was already open
	 */
	private _isDialogOpened: boolean = false;

	/**
	 * Process usual HTML text fragment
	 */
	private processHTML(e: PasteEvent, html: string): boolean {
		if (this.j.o.askBeforePasteHTML) {
			if (this.j.o.memorizeChoiceWhenPasteFragment) {
				const cached = this.pasteStack.find(
					cachedItem => cachedItem.html === html
				);

				if (cached) {
					this.insertByType(
						e,
						html,
						cached.action || this.j.o.defaultActionOnPaste
					);

					return true;
				}
			}

			if (this._isDialogOpened) {
				return true;
			}

			// console.log('event check', e);
			// window.addEventListener('keydown', function (ev: KeyboardEvent) {
			// 	this.alert('hello: ' + ev.AT_TARGET);
			// });

			this.insertByType(e, html, INSERT_CLEAR_HTML);

			// if (e.AT_TARGET == 17 && e.AT_TARGET == 16 && e.AT_TARGET == 86) {
			// 	//You pressed CTRL + SHIFT + V
			// 	this.insertByType(e, html, INSERT_ONLY_TEXT);
			// } else if ((e.AT_TARGET == 17) & (e.AT_TARGET == 86)) {
			// 	//You pressed CTRL + V
			// 	this.insertByType(e, html, INSERT_CLEAR_HTML);
			// } else {
			// 	this.insertByType(e, html, INSERT_AS_TEXT);
			// }

			// $(document).on('keydown', function ( e ) {

			// 	if(first == null) {
			// 		first = e.which;
			// 	} else if(second == null) {
			// 		second = e.which;
			// 	} else if(third == null) {
			// 		third = e.which;
			// 	}
			// 	if(first == 17 && second == 16 & third == 86) {
			// 		alert( "You pressed CTRL + SHIFT + V" );
			// 		first = null;
			// 		second = null;
			// 		third = null;
			// 	}
			// });

			// this.insertByType(e, html, INSERT_CLEAR_HTML); //INSERT_CLEAR_HTML, INSERT_ONLY_TEXT
			this._isDialogOpened = false;
			// const dialog = askInsertTypeKeyCommand(
			// 	this.j,
			// 	'Your code is similar to HTML. Keep as HTML?',
			// 	'Paste as HTML',
			// 	insertType => {
			// 		this._isDialogOpened = false;
			// 		this.insertByType(e, html, insertType);
			// 	},
			// 	this.j.o.pasteHTMLActionList
			// );

			// if (dialog) {
			// 	this._isDialogOpened = true;
			// 	dialog.e.on('beforeClose', () => {
			// 		this._isDialogOpened = false;
			// 	});
			// }

			return true;
		}

		return false;
	}

	/**
	 * Insert HTML by option type
	 */
	insertByType(e: PasteEvent, html: string | Node, action: InsertMode): void {
		this.pasteStack.push({ html, action });

		if (isString(html)) {
			this.j.buffer.set(clipboardPluginKey, html);

			switch (action) {
				case INSERT_CLEAR_HTML:
					html = cleanFromWord(html);
					break;

				case INSERT_ONLY_TEXT:
					html = stripTags(html);
					break;

				case INSERT_AS_TEXT:
					html = htmlspecialchars(html);
					break;

				default:
			}
		}

		pasteInsertHtml(e, this.j, html);
	}

	/**
	 * Replace all \\n chars in plain text to br
	 */
	@autobind
	private onProcessPasteReplaceNl2Br(
		ignore: PasteEvent,
		text: string,
		type: string
	): string | void {
		if (type === TEXT_PLAIN + ';' && !isHTML(text)) {
			return nl2br(text);
		}
	}
}
