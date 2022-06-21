/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:core/plugin/README.md]]
 * @packageDocumentation
 * @module plugin
 */

import type { IZodit, IPlugin, IViewBased } from 'zodit/types';
import { ViewComponent, STATUSES } from '../component';
import { autobind } from 'zodit/core/decorators';
import { isZoditObject } from 'zodit/core/helpers';

export abstract class Plugin<T extends IViewBased = IZodit>
	extends ViewComponent<T>
	implements IPlugin<T>
{
	requires: string[] = [];

	/** @override */
	buttons: IPlugin['buttons'] = [];

	/**
	 * Plugin have CSS style and it should be loaded
	 */
	hasStyle: boolean = false;

	/** @override */
	className(): string {
		return '';
	}

	protected abstract afterInit(zodit: T): void;
	protected abstract beforeDestruct(zodit: T): void;

	constructor(zodit: T) {
		super(zodit);

		zodit.e
			.on('afterPluginSystemInit', () => {
				if (isZoditObject(zodit)) {
					this.buttons?.forEach(btn => {
						zodit.registerButton(btn);
					});
				}
			})
			.on('afterInit', () => {
				this.setStatus(STATUSES.ready);
				this.afterInit(zodit);
			})
			.on('beforeDestruct', this.destruct);
	}

	init(zodit: T): void {
		// empty
	}

	@autobind
	override destruct(): void {
		if (!this.isInDestruct) {
			this.setStatus(STATUSES.beforeDestruct);

			const { j } = this;

			if (isZoditObject(j)) {
				this.buttons?.forEach(btn => {
					j?.unregisterButton(btn);
				});
			}

			this.j?.events?.off('beforeDestruct', this.destruct);
			this.beforeDestruct(this.j);
			super.destruct();
		}
	}
}
