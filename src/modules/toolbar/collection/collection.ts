/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:modules/toolbar/collection/README.md]]
 * @packageDocumentation
 * @module modules/toolbar/collection
 */

import './collection.less';

import type {
	IToolbarButton,
	IToolbarCollection,
	IUIButton,
	Nullable,
	IControlTypeStrong,
	IViewBased,
	ButtonsGroups,
	CanUndef,
	IViewWithToolbar,
	IBound
} from 'zodit/types';

import { error } from 'zodit/core/helpers';

import { UIList } from 'zodit/core/ui';
import { makeButton } from '../factory';
import { component, autobind } from 'zodit/core/decorators';

@component
export class ToolbarCollection<T extends IViewWithToolbar = IViewWithToolbar>
	extends UIList<T>
	implements IToolbarCollection
{
	/** @override */
	override className(): string {
		return 'ToolbarCollection';
	}

	readonly listenEvents =
		'updateToolbar changeStack mousedown mouseup keydown change afterInit readonly afterResize ' +
		'selectionchange changeSelection focus afterSetMode touchstart focus blur';

	/**
	 * First button in list
	 */
	get firstButton(): Nullable<IToolbarButton> {
		const [button] = this.buttons as IToolbarButton[];
		return button || null;
	}

	protected override makeButton(
		control: IControlTypeStrong,
		target: Nullable<HTMLElement> = null
	): IUIButton {
		return makeButton(this.j, control, target);
	}

	/**
	 * Button should be active
	 */
	shouldBeActive(button: IToolbarButton): boolean | undefined {
		return undefined;
	}

	/**
	 * Button should be disabled
	 */
	shouldBeDisabled(button: IToolbarButton): boolean | undefined {
		return undefined;
	}

	/**
	 * Returns current target for button
	 */
	getTarget(button: IToolbarButton): Node | null {
		return button.target || null;
	}

	@autobind
	immediateUpdate(): void {
		if (this.isDestructed || this.j.isLocked) {
			return;
		}

		super.update();

		this.j.e.fire('afterUpdateToolbar');
	}

	override update = this.j.async.debounce(
		this.immediateUpdate,
		() => this.j.defaultTimeout
	);

	/**
	 * Set direction
	 */
	setDirection(direction: 'rtl' | 'ltr'): void {
		this.container.style.direction = direction;
		this.container.setAttribute('dir', direction);
	}

	constructor(zodit: IViewBased) {
		super(zodit as T);
		this.initEvents();
	}

	private initEvents(): void {
		this.j.e
			.on(this.listenEvents, this.update)
			.on('afterSetMode focus', this.immediateUpdate);
	}

	hide(): void {
		this.container.remove();
	}

	show(): void {
		this.appendTo(this.j.toolbarContainer);
	}

	showInline(bound?: IBound): void {
		throw error('The method is not implemented for this class.');
	}

	/** @override **/
	override build(
		items: ButtonsGroups,
		target: Nullable<HTMLElement> = null
	): this {
		const itemsWithGroupps = this.j.e.fire(
			'beforeToolbarBuild',
			items
		) as CanUndef<ButtonsGroups>;

		if (itemsWithGroupps) {
			items = itemsWithGroupps;
		}

		super.build(items, target);
		return this;
	}

	/** @override **/
	override destruct(): void {
		if (this.isDestructed) {
			return;
		}

		this.j.e
			.off(this.listenEvents, this.update)
			.off('afterSetMode focus', this.immediateUpdate);

		super.destruct();
	}
}
