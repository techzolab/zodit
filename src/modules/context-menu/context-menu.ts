/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:modules/context-menu/README.md]]
 * @packageDocumentation
 * @module modules/context-menu
 */

import './context-menu.less';

import type { IContextMenu, IContextMenuAction } from 'zodit/types';
import { Popup } from 'zodit/core/ui/popup';
import { Button } from 'zodit/core/ui/button';
import { isArray } from 'zodit/core/helpers/checker';
import { component } from 'zodit/core/decorators/component/component';

/**
 * Module to generate context menu
 */
@component
export class ContextMenu extends Popup implements IContextMenu {
	/** @override */
	override className(): string {
		return 'ContextMenu';
	}

	/**
	 * Generate and show context menu
	 *
	 * @param x - Global coordinate by X
	 * @param y - Global coordinate by Y
	 * @param actions - Array with plain objects `{icon: 'bin', title: 'Delete', exec: function () {}}`
	 * @example
	 * ```javascript
	 * parent.show(e.clientX, e.clientY, [{icon: 'bin', title: 'Delete', exec: function () { alert(1) }]);
	 * ```
	 */
	show(
		x: number,
		y: number,
		actions: Array<false | IContextMenuAction>
	): void {
		const self = this,
			content = this.j.c.div(this.getFullElName('actions'));

		if (!isArray(actions)) {
			return;
		}

		actions.forEach(item => {
			if (!item) {
				return;
			}

			const action = Button(this.zodit, item.icon || 'empty', item.title);
			this.zodit && action.setParentView(this.zodit);

			action.setMod('context', 'menu');

			action.onAction((e: MouseEvent) => {
				item.exec?.call(self, e);
				self.close();
				return false;
			});

			content.appendChild(action.container);
		});

		this.setContent(content).open(
			() => ({ left: x, top: y, width: 0, height: 0 }),
			true
		);
	}
}
