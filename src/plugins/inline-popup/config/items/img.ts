/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/inline-popup
 */

import type { IControlType, IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { isString } from 'zodit/core/helpers/checker/is-string';
import { css } from 'zodit/core/helpers/utils/css';
import { hAlignElement } from 'zodit/plugins/image/helpers';

export const align: IControlType<IZodit> = {
	name: 'left',
	childTemplate: (_, __, value: string) => value,
	list: ['Left', 'Right', 'Center', 'Normal'],
	exec: (editor: IZodit, elm, { control }): void | false => {
		if (!Dom.isTag(elm, ['img', 'zodit', 'zodit-media'])) {
			return;
		}

		const command = (
			control.args && isString(control.args[0])
				? control.args[0].toLowerCase()
				: ''
		) as Parameters<typeof hAlignElement>[1];

		if (!command) {
			return false;
		}

		hAlignElement(elm, command);
		if (Dom.isTag(elm, ['zodit', 'zodit-media']) && elm.firstElementChild) {
			hAlignElement(elm.firstElementChild as HTMLElement, command);
		}

		editor.synchronizeValues();

		editor.e.fire('recalcPositionPopup');
	},
	tooltip: 'Horizontal align'
};

export default [
	{
		name: 'delete',
		icon: 'bin',
		tooltip: 'Delete',
		exec: (editor: IZodit, image): void => {
			image && editor.s.removeNode(image);
		}
	},
	{
		name: 'pencil',
		exec(editor: IZodit, current): void {
			const tagName = (current as HTMLElement).tagName.toLowerCase();

			if (tagName === 'img') {
				editor.e.fire('openImageProperties', current);
			}
		},
		tooltip: 'Edit'
	},
	{
		name: 'valign',
		list: ['Top', 'Middle', 'Bottom', 'Normal'],
		tooltip: 'Vertical align',
		exec: (editor: IZodit, image, { control }): void | false => {
			if (!Dom.isTag(image, 'img')) {
				return;
			}

			const command =
				control.args && isString(control.args[0])
					? control.args[0].toLowerCase()
					: '';

			if (!command) {
				return false;
			}

			css(image, 'vertical-align', command === 'normal' ? '' : command);

			editor.e.fire('recalcPositionPopup');
		}
	},
	align
] as Array<IControlType | string>;
