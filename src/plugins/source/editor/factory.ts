/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/source
 */

import type { CallbackFunction, IZodit, ISourceEditor } from 'zodit/types';
import { AceEditor, TextAreaEditor } from './engines';
import { isFunction } from 'zodit/core/helpers';

export function createSourceEditor(
	type: 'ace' | 'mirror' | 'area' | ((zodit: IZodit) => ISourceEditor),
	editor: IZodit,
	container: HTMLElement,
	toWYSIWYG: CallbackFunction,
	fromWYSIWYG: CallbackFunction
): ISourceEditor {
	let sourceEditor: ISourceEditor;

	if (isFunction(type)) {
		sourceEditor = type(editor);
	} else {
		switch (type) {
			case 'ace':
				if (!editor.o.shadowRoot) {
					sourceEditor = new AceEditor(
						editor,
						container,
						toWYSIWYG,
						fromWYSIWYG
					);
					break;
				}

			default:
				sourceEditor = new TextAreaEditor(
					editor,
					container,
					toWYSIWYG,
					fromWYSIWYG
				);
		}
	}

	sourceEditor.init(editor);
	sourceEditor.onReadyAlways(() => {
		sourceEditor.setReadOnly(editor.o.readonly);
	});

	return sourceEditor;
}
