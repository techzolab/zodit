/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:modules/widget/tabs/README.md]]
 * @packageDocumentation
 * @module modules/widget/tabs
 */

import './tabs.less';

import type { IDictionary, IZodit, IUIButton } from 'zodit/types';
import { $$, isFunction } from 'zodit/core/helpers';
import { Button, UIElement } from 'zodit/core/ui';
import { Component } from 'zodit/core/component';

export interface TabOption {
	icon?: string;
	name: string;
	content: HTMLElement | (() => void) | UIElement;
}

/**
 * Build tabs system
 *
 * @param tabs - PlainObject where 'key' will be tab's Title and `value` is tab's content
 * @param state - You can use for this param any HTML element for remembering active tab
 *
 * @example
 * ```javascript
 * let tabs = Zodit.modules.TabsWidget(editor, [
 *    {name: 'Images', content: '<div>Images</div>'},
 *    {name: 'Title 2': Zodit.modules.Helpers.dom('<div>Some content</div>')},
 *    {name: 'Color Picker': ColorPickerWidget(editor, function (color) {
 *         box.style.color = color;
 *     }, box.style.color)},
 * ]);
 * ```
 */
export const TabsWidget = (
	zodit: IZodit,
	tabs: TabOption[],
	state?: { __activeTab: string }
): HTMLDivElement => {
	const box = zodit.c.div('zodit-tabs'),
		tabBox = zodit.c.div('zodit-tabs__wrapper'),
		buttons = zodit.c.div('zodit-tabs__buttons'),
		nameToTab: IDictionary<{
			button: IUIButton;
			tab: HTMLElement;
		}> = {},
		buttonList: IUIButton[] = [];

	let firstTab: string = '',
		tabCount: number = 0;

	box.appendChild(buttons);
	box.appendChild(tabBox);

	const setActive = (tab: string): void => {
		if (!nameToTab[tab]) {
			return;
		}

		buttonList.forEach(b => {
			b.state.activated = false;
		});

		$$('.zodit-tab', tabBox).forEach(a => {
			a.classList.remove('zodit-tab_active');
		});

		nameToTab[tab].button.state.activated = true;
		nameToTab[tab].tab.classList.add('zodit-tab_active');
	};

	tabs.forEach(({ icon, name, content }) => {
		const tab = zodit.c.div('zodit-tab'),
			button = Button(zodit, icon || name, name);

		// Stop lose the focus
		zodit.e.on(button.container, 'mousedown', (e: MouseEvent) =>
			e.preventDefault()
		);

		if (!firstTab) {
			firstTab = name;
		}

		buttons.appendChild(button.container);
		buttonList.push(button);

		button.container.classList.add(
			'zodit-tabs__button',
			'zodit-tabs__button_columns_' + tabs.length
		);

		if (!isFunction(content)) {
			tab.appendChild(
				Component.isInstanceOf(content, UIElement)
					? content.container
					: content
			);
		} else {
			tab.appendChild(zodit.c.div('zodit-tab_empty'));
		}

		tabBox.appendChild(tab);

		button.onAction(() => {
			setActive(name);

			if (isFunction(content)) {
				content.call(zodit);
			}

			if (state) {
				state.__activeTab = name;
			}

			return false;
		});

		nameToTab[name] = {
			button,
			tab
		};

		tabCount += 1;
	});

	if (!tabCount) {
		return box;
	}

	$$('a', buttons).forEach(a => {
		a.style.width = (100 / tabCount).toFixed(10) + '%';
	});

	const tab =
		!state || !state.__activeTab || !nameToTab[state.__activeTab]
			? firstTab
			: state.__activeTab;

	setActive(tab);

	if (state) {
		let __activeTab = state.__activeTab;

		Object.defineProperty(state, '__activeTab', {
			configurable: true,
			enumerable: false,
			get() {
				return __activeTab;
			},
			set(value: string) {
				__activeTab = value;

				setActive(value);
			}
		});
	}

	return box;
};
