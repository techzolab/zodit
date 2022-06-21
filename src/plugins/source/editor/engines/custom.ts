/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/source
 */

import type { ISourceEditor } from 'zodit/types';
import { SourceEditor } from '../sourceEditor';

export class CustomEditor
	extends SourceEditor<HTMLTextAreaElement>
	implements ISourceEditor
{
	init(): any {
		this.onReady();
	}

	destruct(): any {}

	getValue(): string {
		return '';
	}

	setValue(raw: string): void {}

	insertRaw(raw: string): void {}

	getSelectionStart(): number {
		return 0;
	}

	getSelectionEnd(): number {
		return 0;
	}

	setSelectionRange(start: number, end: number): void {}

	focus(): void {}

	setPlaceHolder(title: string): void {}

	setReadOnly(isReadOnly: boolean): void {}

	selectAll(): void {}

	replaceUndoManager(): void {}
}
