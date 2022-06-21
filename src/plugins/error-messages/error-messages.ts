/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/error-messages
 */

import './errors-messages.less';

import type { IZodit } from 'zodit/types';
import { Config } from 'zodit/config';
import { Dom } from 'zodit/core/dom';
import { css } from 'zodit/core/helpers/utils/css';
import { toArray } from 'zodit/core/helpers/array/to-array';

declare module 'zodit/config' {
	interface Config {
		showMessageErrors: boolean;

		/**
		 * How long show messages
		 */
		showMessageErrorTime: number;

		/**
		 * Offset fo message
		 */
		showMessageErrorOffsetPx: number;
	}
}

Config.prototype.showMessageErrors = true;
Config.prototype.showMessageErrorTime = 3000;
Config.prototype.showMessageErrorOffsetPx = 3;

const ELM_NAME = 'error-box-for-messages';

/**
 * Plugin display pop-up messages in the lower right corner of the editor
 */
export function errorMessages(editor: IZodit): void {
	if (editor.o.showMessageErrors) {
		const activeClass = editor.getFullElName(ELM_NAME, 'active', true),
			messagesBox = editor.c.div(editor.getFullElName(ELM_NAME)),
			calcOffsets = (): void => {
				let height = 5;

				toArray(
					messagesBox.childNodes as NodeListOf<HTMLElement>
				).forEach(elm => {
					css(elm, 'bottom', height + 'px');

					height +=
						elm.offsetHeight + editor.o.showMessageErrorOffsetPx;
				});
			};

		/**
		 * Show popup error in the bottom of editor
		 *
		 * @param className - Additional class for status. Allow: info, error, success
		 * @param timeout - How many seconds show error
		 * options.showMessageErrorTime = 2000
		 * @example
		 * ```javascript
		 * const editor = Zodit.make('#editors');
		 * editor.e.fire('errorMessage', 'Error 123. File has not been upload');
		 * editor.e.fire('errorMessage', 'You can upload file', 'info', 4000);
		 * editor.e.fire('errorMessage', 'File was uploaded', 'success', 4000);
		 * ```
		 */
		editor.e
			.on('beforeDestruct', () => {
				Dom.safeRemove(messagesBox);
			})
			.on(
				'errorMessage',
				(message: string, type: string, timeout: number) => {
					editor.workplace.appendChild(messagesBox);

					const msg = editor.c.div(activeClass, message);
					msg.classList.add(
						editor.getFullElName(ELM_NAME, 'type', type)
					);

					messagesBox.appendChild(msg);

					calcOffsets();

					editor.async.setTimeout(() => {
						msg.classList.remove(activeClass);

						editor.async.setTimeout(() => {
							Dom.safeRemove(msg);
							calcOffsets();
						}, 300);
					}, timeout || editor.o.showMessageErrorTime);
				}
			);
	}
}
