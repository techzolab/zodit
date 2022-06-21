/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IComponent, Nullable } from './src/types';
import type { IZodit } from './src/types';

export * from './src/types';

declare global {
	const Zodit: IZodit;
	const isProd: boolean;
	const isESNext: boolean;
	const appVersion: string;

	interface HTMLElement {
		component: Nullable<IComponent>;
	}

	interface CaretPosition {
		offsetNode: Node;
		offset: number;
	}

	interface IdleDeadline {
		readonly didTimeout: boolean;
		timeRemaining(): DOMHighResTimeStamp;
	}

	// https://github.com/techzolab/zodit/issues/743
	interface IdleRequestCallback {
		(deadline: IdleDeadline): void;
	}

	interface Document {
		caretPositionFromPoint?(x: number, y: number): CaretPosition;
		caretRangeFromPoint(x: number, y: number): Range;
	}

	// https://github.com/techzolab/zodit/issues/718
	interface ShadowRoot {
		getSelection(): ReturnType<Window['getSelection']>;
	}

	interface Function {
		originalConstructor: Function;
	}
}

export { Zodit };
