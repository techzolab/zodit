/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/clipboard/paste
 */

import type { IZodit, IUIOption, Nullable } from 'zodit/types';
import type {
	PasteEvent,
	InsertMode
} from 'zodit/plugins/clipboard/paste/interface';
import {
	isArray,
	isNumber,
	isString,
	isVoid
} from 'zodit/core/helpers/checker';

import { Dom } from 'zodit/core/dom';
import { TEXT_PLAIN } from 'zodit/core/constants';

import { Confirm, Dialog } from 'zodit/modules';
import { Button } from 'zodit/core/ui';
import { markOwner } from 'zodit/src/core/helpers/utils/utils';

/**
 * Get DataTransfer from different event types
 */
export const getDataTransfer = (
	event: ClipboardEvent | DragEvent
): Nullable<DataTransfer> => {
	if ((event as ClipboardEvent).clipboardData) {
		return (event as ClipboardEvent).clipboardData;
	}

	try {
		return (event as DragEvent).dataTransfer || new DataTransfer();
	} catch {
		return null;
	}
};

/**
 * Remove special HTML comments
 */
function removeExtraFragments(html: string): string {
	html = html.replace(/<meta[^>]+?>/g, '');

	const start = html.search(/<!--StartFragment-->/i);

	if (start !== -1) {
		html = html.substring(start + 20);
	}

	const end = html.search(/<!--EndFragment-->/i);

	if (end !== -1) {
		html = html.substring(0, end);
	}

	return html;
}

function isDragEvent(e: Nullable<PasteEvent>): e is DragEvent {
	return Boolean(e && e.type === 'drop');
}

/**
 * One insert point for clipboard plugins
 */
export function pasteInsertHtml(
	e: Nullable<PasteEvent>,
	editor: IZodit,
	html: number | string | Node
): void {
	if (editor.isInDestruct) {
		return;
	}

	if (isDragEvent(e)) {
		editor.s.insertCursorAtPoint(e.clientX, e.clientY);
	}

	const result = editor.e.fire('beforePasteInsert', html);

	if (
		!isVoid(result) &&
		(isString(result) || isNumber(result) || Dom.isNode(result))
	) {
		html = result;
	}

	if (isString(html)) {
		html = removeExtraFragments(html);
	}

	editor.s.insertHTML(html);
}

/**
 * Return all available data types in event
 */
export function getAllTypes(dt: DataTransfer): string {
	const types: ReadonlyArray<string> | string = dt.types;

	let types_str: string = '';

	if (
		isArray(types) ||
		{}.toString.call(types) === '[object DOMStringList]'
	) {
		for (let i = 0; i < types.length; i += 1) {
			types_str += types[i] + ';';
		}
	} else {
		types_str = (types || TEXT_PLAIN).toString() + ';';
	}

	return types_str;
}

/**
 * Make command dialog
 */
export function askInsertTypeDialog(
	zodit: IZodit,
	msg: string,
	title: string,
	callback: (yes: InsertMode) => void,
	buttonList: IUIOption[]
): Dialog | void {
	if (
		zodit.e.fire(
			'beforeOpenPasteDialog',
			msg,
			title,
			callback,
			buttonList
		) === false
	) {
		return;
	}

	const dialog = Confirm(
		`<div style="word-break: normal; white-space: normal">${zodit.i18n(
			msg
		)}</div>`,
		zodit.i18n(title)
	);

	dialog.bindDestruct(zodit);

	markOwner(zodit, dialog.container);

	const buttons = buttonList.map(({ text, value }) =>
		Button(zodit, {
			text,
			name: text.toLowerCase(),
			tabIndex: 0
		}).onAction(() => {
			dialog.close();
			callback(value as InsertMode);
		})
	);

	dialog.e.one(dialog, 'afterClose', () => {
		if (!zodit.s.isFocused()) {
			zodit.s.focus();
		}
	});

	const cancel = Button(zodit, {
		text: 'Cancel',
		tabIndex: 0
	}).onAction(() => {
		dialog.close();
	});

	dialog.setFooter([...buttons, cancel]);

	buttons[0].focus();
	buttons[0].state.variant = 'primary';

	zodit.e.fire(
		'afterOpenPasteDialog',
		dialog,
		msg,
		title,
		callback,
		buttonList
	);

	return dialog;
}
