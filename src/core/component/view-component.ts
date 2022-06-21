/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module component
 */

import type { IViewBased, IViewComponent } from 'zodit/types';
import { Component } from './component';

export abstract class ViewComponent<T extends IViewBased = IViewBased>
	extends Component
	implements IViewComponent<T>
{
	/**
	 * Parent View element
	 */
	zodit!: T;

	/**
	 * Shortcut for `this.zodit`
	 */
	get j(): T {
		return this.zodit;
	}

	get defaultTimeout(): number {
		return this.j.defaultTimeout;
	}

	i18n(text: string, ...params: Array<string | number>): string {
		return this.j.i18n(text, ...params);
	}

	/**
	 * Attach component to View
	 */
	setParentView(zodit: T): this {
		this.zodit = zodit;

		zodit.components.add(this);

		return this;
	}

	constructor(zodit: T) {
		super();
		this.setParentView(zodit);
	}

	/** @override */
	override destruct(): any {
		this.j.components.delete(this);
		return super.destruct();
	}
}
