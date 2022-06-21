/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/spellcheck
 */

import type { IControlType, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Options specifies whether the editor is to have its spelling and grammar checked or not
		 * @see {@link http://www.w3schools.com/tags/att_global_spellcheck.asp}
		 */
		spellcheck: boolean;
	}
}

Config.prototype.spellcheck = false;

Config.prototype.controls.spellcheck = {
	isActive(e: IZodit): boolean {
		return e.o.spellcheck;
	},
	icon: require('./spellcheck.svg'),
	name: 'spellcheck',
	command: 'toggleSpellcheck',
	tooltip: 'Spellchecking'
} as IControlType;
