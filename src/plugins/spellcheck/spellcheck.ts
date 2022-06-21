/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:plugins/spellcheck/README.md]]
 * @packageDocumentation
 * @module plugins/spellcheck
 */

import type { IZodit } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';
import { attr } from 'zodit/core/helpers/utils/utils';
import { autobind } from 'zodit/core/decorators';

import './config';

export class spellcheck extends Plugin {
	override buttons: Plugin['buttons'] = [
		{
			group: 'state',
			name: 'spellcheck'
		}
	];

	protected afterInit(zodit: IZodit): void {
		zodit.e.on(
			'afterInit afterAddPlace prepareWYSIWYGEditor',
			this.toggleSpellcheck
		);
		this.toggleSpellcheck();

		zodit.registerCommand('toggleSpellcheck', () => {
			this.zodit.o.spellcheck = !this.zodit.o.spellcheck;
			this.toggleSpellcheck();
			this.j.e.fire('updateToolbar');
		});
	}

	@autobind
	private toggleSpellcheck(): void {
		attr(this.zodit.editor, 'spellcheck', this.zodit.o.spellcheck);
	}

	protected beforeDestruct(zodit: IZodit): void {}
}
