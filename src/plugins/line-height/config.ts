/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/line-height
 */

import type { IControlType, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';
import { memorizeExec } from 'zodit/core/helpers';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Default line spacing for the entire editor
		 *
		 * ```js
		 * Zodit.make('#editor', {
		 *   defaultLineHeight: 1.2
		 * })
		 * ```
		 */
		defaultLineHeight: number | null;
	}
}

Config.prototype.defaultLineHeight = null;

Config.prototype.controls.lineHeight = {
	icon: 'line-height',
	command: 'applyLineHeight',
	tags: ['ol'],
	tooltip: 'Line height',
	list: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 2],
	exec: (editor, event, { control }): void | false =>
		memorizeExec(editor, event, { control }, (value: string) => value)
} as IControlType<IZodit> as IControlType;
