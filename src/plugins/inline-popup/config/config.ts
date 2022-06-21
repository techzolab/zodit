/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/inline-popup
 */

import type { IControlType, IDictionary, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		popup: IDictionary<
			| Array<IControlType | string>
			| ((
					editor: IZodit,
					target: HTMLElement | undefined,
					close: () => void
			  ) => Array<IControlType | string> | HTMLElement | string)
		>;

		toolbarInlineDisabledButtons: string[];
		toolbarInline: boolean;
		toolbarInlineForSelection: boolean;
		toolbarInlineDisableFor: string | string[];
	}
}

Config.prototype.toolbarInline = true;
Config.prototype.toolbarInlineForSelection = false;
Config.prototype.toolbarInlineDisableFor = [];
Config.prototype.toolbarInlineDisabledButtons = ['source'];

Config.prototype.popup = {
	a: require('./items/a').default,
	img: require('./items/img').default,
	cells: require('./items/cells').default,
	toolbar: require('./items/toolbar').default,
	zodit: require('./items/iframe').default,
	iframe: require('./items/iframe').default,
	'zodit-media': require('./items/iframe').default,
	selection: [
		'bold',
		'underline',
		'italic',
		'ul',
		'ol',
		'\n',
		'outdent',
		'indent',
		'fontsize',
		'brush',
		'cut',
		'\n',
		'paragraph',
		'link',
		'align',
		'dots'
	]
} as IDictionary<Array<IControlType | string>>;
