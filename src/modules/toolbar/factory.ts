/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:modules/toolbar/README.md]]
 * @packageDocumentation
 * @module modules/toolbar
 */

import type {
	IControlTypeContent,
	IControlTypeStrong,
	IToolbarButton,
	IToolbarCollection,
	IUIElement,
	IViewBased,
	Nullable
} from 'zodit/types';
import { isFunction, isZoditObject } from 'zodit/core/helpers';
import { ToolbarCollection } from './collection/collection';
import { ToolbarEditorCollection } from './collection/editor-collection';
import { ToolbarButton } from './button/button';
import { ToolbarContent } from './button/content';

/**
 * Collection factory
 */
export function makeCollection(
	zodit: IViewBased,
	parentElement?: IUIElement
): IToolbarCollection {
	const collection = isZoditObject(zodit)
		? new ToolbarEditorCollection(zodit)
		: new ToolbarCollection(zodit);

	if (zodit.o.textIcons) {
		collection.container.classList.add('zodit_text_icons');
	}

	if (parentElement) {
		collection.parentElement = parentElement;
	}

	if (zodit.o.toolbarButtonSize) {
		collection.buttonSize = zodit.o.toolbarButtonSize;
	}

	return collection;
}

/**
 * Button factory
 */
export function makeButton(
	zodit: IViewBased,
	control: IControlTypeStrong,
	target: Nullable<HTMLElement> = null
): IToolbarButton {
	if (isFunction(control.getContent)) {
		return new ToolbarContent(
			zodit,
			control as IControlTypeContent,
			target
		);
	}

	const button = new ToolbarButton(zodit, control, target);

	button.state.tabIndex = zodit.o.allowTabNavigation ? 0 : -1;

	return button;
}
