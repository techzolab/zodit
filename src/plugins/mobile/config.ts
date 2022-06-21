/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/mobile
 */

import { Config } from 'zodit/config';
import * as consts from 'zodit/core/constants';
import type {
	CanUndef,
	IControlType,
	IZodit,
	IToolbarCollection
} from 'zodit/types';
import { makeCollection } from 'zodit/modules/toolbar/factory';
import { splitArray } from 'zodit/core/helpers';
import { ToolbarCollection } from 'zodit/modules/toolbar/collection/collection';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Mobile timeout for CLICK emulation
		 */
		mobileTapTimeout: number;

		/**
		 * After resize it will change buttons set for different sizes
		 */
		toolbarAdaptive: boolean;
	}
}

Config.prototype.mobileTapTimeout = 300;
Config.prototype.toolbarAdaptive = true;

Config.prototype.controls.dots = {
	mode: consts.MODE_SOURCE + consts.MODE_WYSIWYG,
	popup: (
		editor: IZodit,
		current: false | Node,
		control: IControlType,
		close,
		button
	) => {
		let store:
			| {
					toolbar: IToolbarCollection;
					rebuild: () => void;
			  }
			| undefined = control.data as any;

		if (store === undefined) {
			store = {
				toolbar: makeCollection(editor),
				rebuild: (): void => {
					if (button) {
						const buttons: CanUndef<Array<string | IControlType>> =
							editor.e.fire(
								'getDiffButtons.mobile',
								button.closest(ToolbarCollection)
							);

						if (buttons && store) {
							store.toolbar.build(splitArray(buttons));

							const w =
								editor.toolbar.firstButton?.container
									.offsetWidth || 36;

							store.toolbar.container.style.width =
								(w + 4) * 3 + 'px';
						}
					}
				}
			};

			control.data = store;
		}

		store.rebuild();

		return store.toolbar;
	},
	tooltip: 'Show all'
} as IControlType;
