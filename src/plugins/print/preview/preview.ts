/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/print/preview
 */

import './preview.less';

import type { IControlType, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';
import { MODE_SOURCE, MODE_WYSIWYG } from 'zodit/core/constants';
import { previewBox } from 'zodit/plugins/print/helpers';
import { Dialog } from 'zodit/modules/dialog/dialog';

Config.prototype.controls.preview = {
	icon: 'eye',
	command: 'preview',
	mode: MODE_SOURCE + MODE_WYSIWYG,
	tooltip: 'Preview'
} as IControlType;

export function preview(editor: IZodit): void {
	editor.registerButton({
		name: 'preview'
	});

	editor.registerCommand(
		'preview',
		(_: any, _1: any, defaultValue: string) => {
			const dialog = new Dialog({
				language: editor.o.language,
				theme: editor.o.theme
			});

			dialog
				.setSize(1024, 600)
				.open('', editor.i18n('Preview'))
				.setModal(true);

			previewBox(editor, defaultValue, 'px', dialog.getElm('content'));
		}
	);
}
