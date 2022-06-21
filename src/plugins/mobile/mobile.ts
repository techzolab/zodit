/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/mobile
 */

import type { IToolbarCollection, IZodit, ButtonsGroups } from 'zodit/types';
import { splitArray, toArray } from 'zodit/core/helpers/';
import { flatButtonsSet } from 'zodit/core/ui/helpers/buttons';

import './config';

/**
 * Rebuild toolbar in depends of editor's width
 */
export function mobile(editor: IZodit): void {
	let timeout: number = 0,
		store: ButtonsGroups = splitArray(editor.o.buttons);

	if (editor.o.mobileTapTimeout) {
		// Emulate double tap
		editor.e.on('touchend', (e: TouchEvent & MouseEvent): void | false => {
			if (e.changedTouches && e.changedTouches.length) {
				const now = new Date().getTime(),
					diff = now - timeout;

				if (diff > editor.o.mobileTapTimeout) {
					timeout = now;

					if (diff < editor.o.mobileTapTimeout * 1.5) {
						editor.s.insertCursorAtPoint(e.clientX, e.clientY);
					}
				}
			}
		});
	}

	editor.e.on(
		'getDiffButtons.mobile',
		(toolbar: IToolbarCollection): void | ButtonsGroups => {
			if (toolbar === editor.toolbar) {
				const buttons = flatButtonsSet(
						splitArray(editor.o.buttons),
						editor
					),
					flatStore = flatButtonsSet(store, editor);

				return toArray(buttons).reduce((acc, item) => {
					if (!flatStore.has(item)) {
						acc.push(item);
					}

					return acc;
				}, [] as ButtonsGroups);
			}
		}
	);

	if (editor.o.toolbarAdaptive) {
		editor.e
			.on(
				'resize afterInit recalcAdaptive changePlace afterAddPlace',
				() => {
					if (!editor.o.toolbar) {
						return;
					}

					const width = (
						editor.container.parentElement ?? editor.container
					).offsetWidth;

					const newStore = ((): ReturnType<typeof splitArray> => {
						if (width >= editor.o.sizeLG) {
							return splitArray(editor.o.buttons);
						}

						if (width >= editor.o.sizeMD) {
							return splitArray(editor.o.buttonsMD);
						}

						if (width >= editor.o.sizeSM) {
							return splitArray(editor.o.buttonsSM);
						}

						return splitArray(editor.o.buttonsXS);
					})();

					if (newStore.toString() !== store.toString()) {
						store = newStore;

						editor.e.fire('closeAllPopups');

						editor.toolbar
							.setRemoveButtons(editor.o.removeButtons)
							.build(store.concat(editor.o.extraButtons));
					}
				}
			)
			.on(editor.ow, 'load resize', () =>
				editor.e.fire('recalcAdaptive')
			);
	}
}
