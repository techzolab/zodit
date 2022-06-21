/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/ordered-list
 */

import type { IZodit } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';
import { autobind } from 'zodit/core/decorators';

import './config';

/**
 * Process commands insertOrderedList and insertUnOrderedList
 */
export class orderedList extends Plugin {
	override buttons: Plugin['buttons'] = [
		{
			name: 'ul',
			group: 'list'
		},
		{
			name: 'ol',
			group: 'list'
		}
	];

	protected afterInit(zodit: IZodit): void {
		zodit
			.registerCommand('insertUnorderedList', this.onCommand)
			.registerCommand('insertOrderedList', this.onCommand);
	}

	@autobind
	private onCommand(command: string, _: unknown, type: string): false {
		this.zodit.s.applyStyle(
			{
				listStyleType: type ?? null
			},
			{
				element: command === 'insertunorderedlist' ? 'ul' : 'ol'
			}
		);

		this.zodit.synchronizeValues();

		return false;
	}

	protected beforeDestruct(zodit: IZodit): void {}
}
