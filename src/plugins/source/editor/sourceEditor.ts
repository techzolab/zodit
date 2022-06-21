/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/source
 */

import type { CallbackFunction, IZodit } from 'zodit/types';

export abstract class SourceEditor<T> {
	instance!: T;
	className: string = '';

	constructor(
		readonly zodit: IZodit,
		readonly container: HTMLElement,
		readonly toWYSIWYG: CallbackFunction,
		readonly fromWYSIWYG: CallbackFunction
	) {}

	/**
	 * Short alias for this.zodit
	 */
	get j(): this['zodit'] {
		return this.zodit;
	}

	abstract init(editor: IZodit): void;
	abstract replaceUndoManager(): void;

	isReady: boolean = false;
	protected onReady(): void {
		this.replaceUndoManager();
		this.isReady = true;
		this.j.e.fire(this, 'ready');
	}

	onReadyAlways(onReady: CallbackFunction): void {
		if (!this.isReady) {
			this.j.events?.on(this, 'ready', onReady);
		} else {
			onReady();
		}
	}
}
