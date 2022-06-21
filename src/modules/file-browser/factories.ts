/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/file-browser
 */

import type {
	IContextMenu,
	IFileBrowserDataProvider,
	IFileBrowserOptions,
	IUIElement,
	IViewBased
} from 'zodit/types';
import DataProvider from './data-provider';
import { ContextMenu } from '../context-menu/context-menu';

export function makeDataProvider(
	parent: IViewBased,
	options: IFileBrowserOptions
): IFileBrowserDataProvider {
	return new DataProvider(parent, options);
}

export function makeContextMenu(parent: IViewBased): IContextMenu & IUIElement {
	return new ContextMenu(parent);
}
