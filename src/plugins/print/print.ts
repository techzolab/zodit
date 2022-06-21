/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/print
 */

import type { IControlType, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';
import { getContainer } from 'zodit/core/global';
import { Dom } from 'zodit/core/dom';
import { defaultLanguage } from 'zodit/core/helpers';
import * as consts from 'zodit/core/constants';
import { previewBox } from 'zodit/plugins/print/helpers';
import { generateCriticalCSS } from 'zodit/plugins/print/lib/generate-critical-css';

Config.prototype.controls.print = {
	exec: (editor: IZodit) => {
		const iframe = editor.create.element('iframe');

		Object.assign(iframe.style, {
			position: 'fixed',
			right: 0,
			bottom: 0,
			width: 0,
			height: 0,
			border: 0
		});

		getContainer(editor, Config).appendChild(iframe);

		const afterFinishPrint = (): void => {
			editor.e.off(editor.ow, 'mousemove', afterFinishPrint);
			Dom.safeRemove(iframe);
		};

		const myWindow = iframe.contentWindow;
		if (myWindow) {
			editor.e
				.on(myWindow, 'onbeforeunload onafterprint', afterFinishPrint)
				.on(editor.ow, 'mousemove', afterFinishPrint);

			if (editor.o.iframe) {
				editor.e.fire(
					'generateDocumentStructure.iframe',
					myWindow.document,
					editor
				);

				myWindow.document.body.innerHTML = editor.value;
			} else {
				myWindow.document.write(
					'<!doctype html><html lang="' +
						defaultLanguage(editor.o.language) +
						'"><head><title></title></head><style>' +
						generateCriticalCSS(editor) +
						'</style><body></body></html>'
				);
				myWindow.document.close();
				previewBox(editor, undefined, 'px', myWindow.document.body);
			}

			const style = myWindow.document.createElement('style');

			style.innerHTML = `@media print {
					body {
							-webkit-print-color-adjust: exact;
					}
			}`;

			myWindow.document.head.appendChild(style);

			myWindow.focus();
			myWindow.print();
		}
	},
	mode: consts.MODE_SOURCE + consts.MODE_WYSIWYG,
	tooltip: 'Print'
} as IControlType;

export function print(editor: IZodit): void {
	editor.registerButton({
		name: 'print'
	});
}
