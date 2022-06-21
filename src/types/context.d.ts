/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module types
 */

import type { IDestructible } from './types';
import type { IPopup } from './popup';

export interface IContextMenuAction {
	icon?: string;
	title?: string;
	exec?: (this: IContextMenu, e: MouseEvent) => false | void;
	enabled?: boolean;
}

export interface IContextMenu extends IDestructible, IPopup {
	show(
		x: number,
		y: number,
		actions: Array<false | IContextMenuAction>
	): void;
}
