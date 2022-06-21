/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/media
 */

import type { IZodit } from 'zodit/types';
import { Config } from 'zodit/config';
import * as consts from 'zodit/core/constants';
import { $$, attr, dataBind } from 'zodit/core/helpers';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Decorate media elements
		 */
		mediaInFakeBlock: boolean;

		/**
		 * Decorate media element with tag
		 */
		mediaFakeTag: string;

		/**
		 * Media tags
		 */
		mediaBlocks: string[];
	}
}

Config.prototype.mediaFakeTag = 'zodit-media';
Config.prototype.mediaInFakeBlock = true;
Config.prototype.mediaBlocks = ['video', 'audio'];

/**
 * Process `video` and `audio`
 */
export function media(editor: IZodit): void {
	const keyFake: string = 'zodit_fake_wrapper';

	const { mediaFakeTag, mediaBlocks, mediaInFakeBlock } = editor.options;

	const wrap = (element: HTMLElement): void => {
		if (
			element.parentNode &&
			attr(element.parentNode as HTMLElement, 'data-zodit_iframe_wrapper')
		) {
			element = element.parentNode as HTMLElement;
		} else {
			const wrapper = editor.createInside.element(mediaFakeTag, {
				'data-zodit-temp': 1,
				contenteditable: false,
				draggable: true,
				[`data-${keyFake}`]: 1
			});

			attr(wrapper, 'style', attr(element, 'style'));

			wrapper.style.display =
				element.style.display === 'inline-block'
					? 'inline-block'
					: 'block';
			wrapper.style.width = element.offsetWidth + 'px';
			wrapper.style.height = element.offsetHeight + 'px';

			if (element.parentNode) {
				element.parentNode.insertBefore(wrapper, element);
			}

			wrapper.appendChild(element);

			element = wrapper;
		}

		editor.e
			.off(element, 'mousedown.select touchstart.select')
			.on(element, 'mousedown.select touchstart.select', () => {
				editor.s.setCursorAfter(element);
			});
	};

	if (mediaInFakeBlock) {
		editor.e
			.on('afterGetValueFromEditor', (data: { value: string }) => {
				const rxp = new RegExp(
					`<${mediaFakeTag}[^>]+data-${keyFake}[^>]+>([^]+?)</${mediaFakeTag}>`,
					'ig'
				);

				if (rxp.test(data.value)) {
					data.value = data.value.replace(rxp, '$1');
				}
			})
			.on(
				'change afterInit afterSetMode changePlace',
				editor.async.debounce(() => {
					if (
						!editor.isDestructed &&
						editor.getMode() !== consts.MODE_SOURCE
					) {
						$$(mediaBlocks.join(','), editor.editor).forEach(
							(elm: HTMLElement) => {
								if (!dataBind(elm, keyFake)) {
									dataBind(elm, keyFake, true);
									wrap(elm);
								}
							}
						);
					}
				}, editor.defaultTimeout)
			);
	}
}
