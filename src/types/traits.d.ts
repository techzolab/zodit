/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module types
 */

import type { IDictionary, Nullable } from 'zodit/types';

export type ModType = string | boolean | null;

export interface IMods {
	/**
	 * Set/remove modification (null - remove)
	 */
	setMod(name: string, value: ModType): this;
	getMod(name: string): ModType;
	mods: IDictionary<ModType>;
}

export interface IElms {
	getElm(elementName: string): Nullable<HTMLElement>;
	getElms(elementName: string): HTMLElement[];
}
