/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/link
 */

import type { IControlType, IZodit, IUIOption, IUIForm } from 'zodit/types';
import { Config } from 'zodit/config';
import { formTemplate } from './template';
import { Dom } from 'zodit/core/dom/dom';

declare module 'zodit/config' {
	interface Config {
		link: {
			/**
			 * Template for the link dialog form
			 */
			formTemplate: (editor: IZodit) => string | HTMLElement | IUIForm;
			formClassName?: string;

			/**
			 * Follow link address after dblclick
			 */
			followOnDblClick: boolean;

			/**
			 * Replace inserted youtube/vimeo link to `iframe`
			 */
			processVideoLink: boolean;

			/**
			 * Wrap inserted link
			 */
			processPastedLink: boolean;

			/**
			 * Show `no follow` checkbox in link dialog.
			 */
			noFollowCheckbox: boolean;

			/**
			 * Show `Open in new tab` checkbox in link dialog.
			 */
			openInNewTabCheckbox: boolean;

			/**
			 * Use an input text to ask the classname or a select or not ask
			 */
			modeClassName: 'input' | 'select';

			/**
			 * Allow multiple choises (to use with modeClassName="select")
			 */
			selectMultipleClassName: boolean;

			/**
			 * The size of the select (to use with modeClassName="select")
			 */
			selectSizeClassName?: number;

			/**
			 * The list of the option for the select (to use with modeClassName="select")
			 */
			selectOptionsClassName: IUIOption[];

			hotkeys: string[];
		};
	}
}

Config.prototype.link = {
	formTemplate,
	followOnDblClick: false,
	processVideoLink: true,
	processPastedLink: true,
	noFollowCheckbox: true,
	openInNewTabCheckbox: true,
	modeClassName: 'input',
	selectMultipleClassName: true,
	selectSizeClassName: 3,
	selectOptionsClassName: [],
	hotkeys: ['ctrl+k', 'cmd+k']
};

Config.prototype.controls.unlink = {
	exec: (editor: IZodit, current: Node) => {
		const anchor: HTMLAnchorElement | false = Dom.closest(
			current,
			'a',
			editor.editor
		) as HTMLAnchorElement;

		if (anchor) {
			Dom.unwrap(anchor);
		}

		editor.synchronizeValues();
		editor.e.fire('hidePopup');
	},
	tooltip: 'Unlink'
} as IControlType;

Config.prototype.controls.link = {
	isActive: (editor: IZodit): boolean => {
		const current = editor.s.current();
		return Boolean(current && Dom.closest(current, 'a', editor.editor));
	},

	popup: (editor: IZodit, current, self: IControlType, close: () => void) => {
		return editor.e.fire('generateLinkForm.link', current, close);
	},
	tags: ['a'],
	tooltip: 'Insert link'
} as IControlType;
