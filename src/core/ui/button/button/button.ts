/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui/button
 */

import './button.less';

import type {
	IUIButton,
	IUIButtonState,
	IUIButtonStatePartial,
	IViewBased,
	ButtonVariant
} from 'zodit/types';
import { UIElement } from 'zodit/core/ui/element';
import { Dom } from 'zodit/core/dom/dom';
import { attr } from 'zodit/core/helpers/utils';
import { isString } from 'zodit/core/helpers/checker/is-string';
import { isFunction } from 'zodit/core/helpers/checker/is-function';
import { Icon } from 'zodit/core/ui/icon';
import { UIList } from 'zodit/core/ui/group/list';
import { autobind, component, watch } from 'zodit/core/decorators';
import { STATUSES } from 'zodit/core/component/statuses';

export const UIButtonState = (): IUIButtonState => ({
	size: 'middle',
	type: 'button',
	name: '',
	value: '',

	variant: 'initial',
	disabled: false,
	activated: false,

	icon: {
		name: 'empty',
		fill: '',
		iconURL: ''
	},

	tooltip: '',
	text: '',
	tabIndex: undefined
});

@component
export class UIButton extends UIElement implements IUIButton {
	/** @override */
	override className(): string {
		return 'UIButton';
	}

	/**
	 * Marker for buttons
	 */
	readonly isButton: true = true;

	readonly state = UIButtonState();

	/**
	 * Set state
	 */
	setState(state: IUIButtonStatePartial): this {
		Object.assign(this.state, state);
		return this;
	}

	/**
	 * DOM container for text content
	 */
	text!: HTMLElement;

	/**
	 * DOM container for icon
	 */
	icon!: HTMLElement;

	@watch('state.size')
	protected onChangeSize(): void {
		this.setMod('size', this.state.size);
	}

	@watch('state.type')
	protected onChangeType(): void {
		attr(this.container, 'type', this.state.type);
	}

	/**
	 * Set size from parent list
	 */
	@watch('parentElement')
	protected updateSize(): void {
		const pe = this.closest(UIList) as UIList;

		if (pe) {
			this.state.size = pe.buttonSize;
			return;
		}
	}

	@watch('state.variant')
	protected onChangeStatus(): void {
		this.setMod('variant', this.state.variant);
	}

	@watch('state.text')
	protected onChangeText(): void {
		this.text.textContent = this.zodit.i18n(this.state.text);
	}

	@watch('state.text')
	protected onChangeTextSetMode(): void {
		this.setMod('text-icons', Boolean(this.state.text.trim().length));
	}

	@watch('state.disabled')
	protected onChangeDisabled(): void {
		attr(this.container, 'disabled', this.state.disabled || null);
	}

	@watch('state.activated')
	protected onChangeActivated(): void {
		attr(this.container, 'aria-pressed', this.state.activated);
	}

	@watch('state.name')
	protected onChangeName(): void {
		this.container.classList.add(
			`${this.componentName}_${this.clearName(this.state.name)}`
		);

		this.name = this.state.name;

		attr(this.container, 'data-ref', this.state.name);
		attr(this.container, 'ref', this.state.name);
	}

	@watch('state.tooltip')
	protected onChangeTooltip(): void {
		if (this.get('j.o.useNativeTooltip')) {
			attr(this.container, 'title', this.state.tooltip);
		}

		attr(this.container, 'aria-label', this.state.tooltip);
	}

	@watch('state.tabIndex')
	protected onChangeTabIndex(): void {
		attr(this.container, 'tabindex', this.state.tabIndex);
	}

	@watch('state.icon')
	protected onChangeIcon(): void {
		const textIcons = this.get('j.o.textIcons');

		if (
			textIcons === true ||
			(isFunction(textIcons) && textIcons(this.state.name))
		) {
			return;
		}

		Dom.detach(this.icon);

		const iconElement = Icon.makeIcon(this.j, this.state.icon);
		iconElement && this.icon.appendChild(iconElement);
	}

	/**
	 * Set focus on element
	 */
	focus(): void {
		this.container.focus();
	}

	/**
	 * Element has focus
	 */
	isFocused(): boolean {
		const { activeElement } = this.od;

		return Boolean(
			activeElement && Dom.isOrContains(this.container, activeElement)
		);
	}

	/** @override */
	protected override createContainer(): HTMLElement {
		const cn = this.componentName;

		const button = this.j.c.element('button', {
			class: cn,
			type: 'button',
			role: 'button',
			ariaPressed: false
		});

		this.icon = this.j.c.span(cn + '__icon');
		this.text = this.j.c.span(cn + '__text');

		button.appendChild(this.icon);
		button.appendChild(this.text);

		this.j.e.on(button, 'click', this.onActionFire);

		return button;
	}

	constructor(zodit: IViewBased, state?: IUIButtonStatePartial) {
		super(zodit);

		this.updateSize();
		this.onChangeSize();
		this.onChangeStatus();

		if (state) {
			this.hookStatus(STATUSES.ready, () => {
				this.setState(state);
			});
		}
	}

	override destruct(): any {
		this.j.e.off(this.container);
		return super.destruct();
	}

	private readonly actionHandlers: Function[] = [];

	/**
	 * Add action handler
	 */
	onAction(callback: (originalEvent: MouseEvent) => void): this {
		this.actionHandlers.push(callback);
		return this;
	}

	/**
	 * Fire all click handlers
	 */
	@autobind
	private onActionFire(e: MouseEvent): void {
		e.buffer = {
			actionTrigger: this
		};

		this.actionHandlers.forEach(callback => callback.call(this, e));
	}
}

export function Button(zodit: IViewBased, icon: string): IUIButton;
export function Button(
	zodit: IViewBased,
	icon: string,
	text?: string
): IUIButton;
export function Button(
	zodit: IViewBased,
	icon: string,
	text: string,
	variant?: ButtonVariant
): IUIButton;
export function Button(
	zodit: IViewBased,
	state: IUIButtonStatePartial,
	variant?: ButtonVariant
): IUIButton;

export function Button(
	zodit: IViewBased,
	stateOrText: string | IUIButtonStatePartial,
	text?: string,
	variant?: ButtonVariant
): IUIButton {
	const button = new UIButton(zodit);

	button.state.tabIndex = zodit.o.allowTabNavigation ? 0 : -1;

	if (isString(stateOrText)) {
		button.state.icon.name = stateOrText;
		button.state.name = stateOrText;

		if (variant) {
			button.state.variant = variant;
		}

		if (text) {
			button.state.text = text;
		}
	} else {
		button.setState(stateOrText);
	}

	return button;
}
