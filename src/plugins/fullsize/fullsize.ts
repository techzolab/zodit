/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fullsize
 */

import './fullsize.less';

import type { IViewWithToolbar, IControlType, IViewBased } from 'zodit/types';
import { Config } from 'zodit/config';
import * as consts from 'zodit/core/constants';
import { css } from 'zodit/core/helpers/utils/css';
import { isZoditObject } from 'zodit/core/helpers/checker/is-zodit-object';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Open WYSIWYG in full screen
		 * @example
		 * ```javascript
		 * var editor = Zodit.make({
		 *     fullsize: true // fullsize editor
		 * });
		 * ```
		 * @example
		 * ```javascript
		 * var editor = Zodit.make();
		 * editor.e.fire('toggleFullSize');
		 * editor.e.fire('toggleFullSize', true); // fullsize
		 * editor.e.fire('toggleFullSize', false); // usual mode
		 * ```
		 */
		fullsize: boolean;

		/**
		 * True, after `fullsize` -  all editors elements above zodit will get `zodit_fullsize-box_true` class (z-index: 100000 !important;)
		 */
		globalFullSize: boolean;
	}
}

Config.prototype.fullsize = false;
Config.prototype.globalFullSize = true;

Config.prototype.controls.fullsize = {
	exec: (editor: IViewBased) => {
		editor.toggleFullSize();
	},

	update(button, editor) {
		const mode = editor.isFullSize ? 'shrink' : 'fullsize';

		button.state.activated = editor.isFullSize;

		if (editor.o.textIcons) {
			button.state.text = mode;
		} else {
			button.state.icon.name = mode;
		}
	},

	tooltip: 'Open editor in fullsize',

	mode: consts.MODE_SOURCE + consts.MODE_WYSIWYG
} as IControlType;

/**
 * Process `toggleFullSize` event, and behavior - set/unset fullsize mode
 */
export function fullsize(editor: IViewWithToolbar): void {
	editor.registerButton({
		name: 'fullsize'
	});

	let isEnabled: boolean = false,
		oldHeight: number = 0,
		oldWidth: number = 0,
		wasToggled = false;

	const resize = (): void => {
			const { container, events } = editor;

			if (events) {
				if (isEnabled) {
					oldHeight = css(container, 'height', true) as number;
					oldWidth = css(container, 'width', true) as number;
					css(container, {
						height: editor.ow.innerHeight,
						width: editor.ow.innerWidth
					});

					wasToggled = true;
				} else if (wasToggled) {
					css(container, {
						height: oldHeight || 'auto',
						width: oldWidth || 'auto'
					});
				}
			}
		},
		/**
		 * Change editor's state between FullSize and normal
		 */
		toggle = (enable?: boolean): void => {
			const { container, events } = editor;

			if (!container) {
				return;
			}

			if (enable === undefined) {
				enable = !container.classList.contains('zodit_fullsize');
			}

			editor.setMod('fullsize', enable);

			editor.o.fullsize = enable;

			isEnabled = enable;

			container.classList.toggle('zodit_fullsize', enable);

			if (editor.toolbar) {
				isZoditObject(editor) &&
					editor.toolbarContainer.appendChild(
						editor.toolbar.container
					);

				css(editor.toolbar.container, 'width', 'auto');
			}

			if (editor.o.globalFullSize) {
				let node = container.parentNode as HTMLElement;

				while (node && node.nodeType !== Node.DOCUMENT_NODE) {
					node.classList.toggle('zodit_fullsize-box_true', enable);
					node = node.parentNode as HTMLElement;
				}

				resize();
			}

			events.fire('afterResize');
		};

	if (editor.o.globalFullSize) {
		editor.e.on(editor.ow, 'resize', resize);
	}

	editor.e
		.on('afterInit afterOpen', () => {
			editor.toggleFullSize(editor?.options?.fullsize);
		})
		.on('toggleFullSize', toggle)
		.on('beforeDestruct', () => {
			isEnabled && toggle(false);
		})
		.on('beforeDestruct', () => {
			editor.events && editor.e.off(editor.ow, 'resize', resize);
		});
}
