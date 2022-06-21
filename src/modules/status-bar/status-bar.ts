/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:modules/status-bar/README.md]]
 * @packageDocumentation
 * @module modules/status-bar
 */

import './status-bar.less';

import type {
	IZodit,
	IStatusBar,
	IDictionary,
	ModType,
	CanUndef
} from 'zodit/types';
import { ViewComponent, STATUSES } from 'zodit/core/component';
import { Dom } from 'zodit/core/dom';
import { Elms, Mods } from 'zodit/core/traits';
import { component } from 'zodit/core/decorators';

@component
export class StatusBar extends ViewComponent<IZodit> implements IStatusBar {
	className(): string {
		return 'StatusBar';
	}

	container!: HTMLDivElement;

	/**
	 * Hide statusbar
	 */
	hide(): void {
		this.container.classList.add('zodit_hidden');
	}

	/**
	 * Show statusbar
	 */
	show(): void {
		this.container.classList.remove('zodit_hidden');
	}

	/**
	 * Status bar is shown
	 */
	get isShown(): boolean {
		return !this.container.classList.contains('zodit_hidden');
	}

	readonly mods: IDictionary<ModType> = {};

	/** @see [[Mods.setMod]] */
	setMod(name: string, value: ModType): this {
		Mods.setMod.call(this, name, value);
		return this;
	}

	/** @see [[Mods.getMod]] */
	getMod(name: string): ModType {
		return Mods.getMod.call(this, name);
	}

	/**
	 * Height of statusbar
	 */
	getHeight(): number {
		return this.container?.offsetHeight ?? 0;
	}

	private findEmpty(inTheRight: boolean = false): CanUndef<HTMLElement> {
		const items = Elms.getElms.call(
			this,
			inTheRight ? 'item-right' : 'item'
		);

		for (let i = 0; i < items.length; i += 1) {
			if (!items[i].innerHTML.trim().length) {
				return items[i];
			}
		}

		return;
	}

	/**
	 * Add element in statusbar
	 */
	append(child: HTMLElement, inTheRight: boolean = false): void {
		const wrapper =
			this.findEmpty(inTheRight) ||
			this.j.c.div(this.getFullElName('item'));

		if (inTheRight) {
			wrapper.classList.add(this.getFullElName('item-right'));
		}

		wrapper.appendChild(child);

		this.container?.appendChild(wrapper);

		if (this.j.o.statusbar) {
			this.show();
		}

		this.j.e.fire('resize');
	}

	constructor(zodit: IZodit, readonly target: HTMLElement) {
		super(zodit);

		this.container = zodit.c.div('zodit-status-bar');

		target.appendChild(this.container);
		this.hide();
	}

	override destruct(): void {
		if (this.isInDestruct) {
			return;
		}

		this.setStatus(STATUSES.beforeDestruct);
		Dom.safeRemove(this.container);
		super.destruct();
	}
}
