/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:plugins/keyboard/tab/README.md]]
 * @packageDocumentation
 * @module plugins/keyboard/tab
 */

import type { IZodit } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';
import { watch } from 'zodit/core/decorators';
import { KEY_TAB } from 'zodit/core/constants';
import { onTabInsideLi } from 'zodit/plugins/keyboard/tab/cases';

import './config';

export class tab extends Plugin {
	protected afterInit(zodit: IZodit): void {}

	@watch(':keydown.tab')
	protected onTab(event: KeyboardEvent): false | void {
		if (event.key === KEY_TAB && onTabInsideLi(this.j)) {
			return false;
		}
	}

	protected beforeDestruct(zodit: IZodit): void {}
}
