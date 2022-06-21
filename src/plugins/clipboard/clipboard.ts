/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/clipboard
 */

import type { IZodit, IPlugin } from 'zodit/types';
import type { Plugin } from 'zodit/core/plugin';
import { TEXT_HTML, TEXT_PLAIN } from 'zodit/core/constants';
import { stripTags } from 'zodit/core/helpers';
import { getDataTransfer } from './paste/helpers';

export const pluginKey = 'clipboard';

/**
 * Clipboard plugin - cut and copy functionality
 */
export class clipboard implements IPlugin {
	zodit!: IZodit;

	/** @override */
	buttons: Plugin['buttons'] = [
		{
			name: 'cut',
			group: 'clipboard'
		},
		{
			name: 'copy',
			group: 'clipboard'
		},
		{
			name: 'paste',
			group: 'clipboard'
		},
		{
			name: 'selectall',
			group: 'clipboard'
		}
	];

	init(editor: IZodit): void {
		this.buttons?.forEach(btn => editor.registerButton(btn));

		editor.e
			.off(`copy.${pluginKey} cut.${pluginKey}`)
			.on(
				`copy.${pluginKey} cut.${pluginKey}`,
				(event: ClipboardEvent): false | void => {
					const selectedText = editor.s.html;

					const clipboardData =
						getDataTransfer(event) ||
						getDataTransfer(editor.ew as any) ||
						getDataTransfer((event as any).originalEvent);

					if (clipboardData) {
						clipboardData.setData(
							TEXT_PLAIN,
							stripTags(selectedText)
						);
						clipboardData.setData(TEXT_HTML, selectedText);
					}

					editor.buffer.set(pluginKey, selectedText);
					editor.e.fire('pasteStack', {
						html: selectedText,
						action: editor.o.defaultActionOnPaste
					});

					if (event.type === 'cut') {
						editor.s.remove();
						editor.s.focus();
					}

					event.preventDefault();

					editor?.events?.fire('afterCopy', selectedText);
				}
			);
	}

	/** @override */
	destruct(editor: IZodit): void {
		editor?.buffer?.set(pluginKey, '');
		editor?.events?.off('.' + pluginKey);
	}
}
