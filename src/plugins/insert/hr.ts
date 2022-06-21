/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/insert
 */

import type { IControlType, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';
import { Dom } from 'zodit/core/dom';

Config.prototype.controls.hr = {
	command: 'insertHorizontalRule',
	tags: ['hr'],
	tooltip: 'Insert Horizontal Line'
} as IControlType;

export function hr(editor: IZodit): void {
	editor.registerButton({
		name: 'hr',
		group: 'insert'
	});

	editor.registerCommand('insertHorizontalRule', () => {
		const elm = editor.createInside.element('hr');
		editor.s.insertNode(elm, false, false);

		const block = Dom.closest(
			elm.parentElement,
			Dom.isBlock,
			editor.editor
		);

		if (block && Dom.isEmpty(block) && block !== editor.editor) {
			Dom.after(block, elm);
			Dom.safeRemove(block);
		}

		let p = Dom.next(elm, Dom.isBlock, editor.editor, false);

		if (!p) {
			p = editor.createInside.element(editor.o.enter);
			Dom.after(elm, p);
		}

		editor.s.setCursorIn(p);

		return false;
	});
}
