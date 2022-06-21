/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module types
 */

import type { IDestructible, IInitable } from './types';

export interface ISourceEditor extends IDestructible, IInitable {
	getValue(): string;
	setValue(raw: string): void;
	insertRaw(raw: string): void;
	getSelectionEnd(): number;
	getSelectionStart(): number;
	setSelectionRange(start: number, end: number): void;

	setPlaceHolder(title: string): void;

	readonly isFocused: boolean;
	focus(): void;
	blur(): void;

	setReadOnly(isReadOnly: boolean): void;

	selectAll(): void;

	isReady: boolean;
	onReadyAlways(callback: Function): void;
}
