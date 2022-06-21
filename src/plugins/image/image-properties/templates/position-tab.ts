/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/image/image-properties
 */

import type { IZodit } from 'zodit/types';
import { Icon } from '../../../../core/ui';

export function positionTab(editor: IZodit): HTMLElement {
	const opt = editor.o,
		i18n = editor.i18n.bind(editor),
		gi = Icon.get.bind(Icon);

	return editor.c.fromHTML(`<div style="${
		!opt.image.editMargins ? 'display:none' : ''
	}" class="zodit-form__group">
			<label>${i18n('Margins')}</label>
			<div class="zodit-grid zodit_vertical_middle">
				<input class="zodit_col-lg-1-5 zodit-input" data-ref="marginTop" type="text" placeholder="${i18n(
					'top'
				)}"/>
				<a style="text-align: center;" data-ref="lockMargin" class="zodit-properties__lock zodit_col-lg-1-5">${gi(
					'lock'
				)}</a>
				<input disabled="true" class="zodit_col-lg-1-5 zodit-input" data-ref="marginRight" type="text" placeholder="${i18n(
					'right'
				)}"/>
				<input disabled="true" class="zodit_col-lg-1-5 zodit-input" data-ref="marginBottom" type="text" placeholder="${i18n(
					'bottom'
				)}"/>
				<input disabled="true" class="zodit_col-lg-1-5 zodit-input" data-ref="marginLeft" type="text" placeholder="${i18n(
					'left'
				)}"/>
			</div>
		</div>
		<div
			style="${!opt.image.editAlign ? 'display:none' : ''}"
			class="zodit-form__group"
		>
			<label>${i18n('Align')}</label>
			<select data-ref="align" class="zodit-select">
				<option value="">${i18n('--Not Set--')}</option>
				<option value="left">${i18n('Left')}</option>
				<option value="center">${i18n('Center')}</option>
				<option value="right">${i18n('Right')}</option>
			</select>
		</div>
		<div style="${
			!opt.image.editStyle ? 'display:none' : ''
		}" class="zodit-form__group">
			<label>${i18n('Styles')}</label>
			<input data-ref="style" type="text" class="zodit-input"/>
		</div>
		<div style="${
			!opt.image.editClass ? 'display:none' : ''
		}" class="zodit-form__group">
			<label>${i18n('Classes')}</label>
			<input data-ref="classes" type="text" class="zodit-input"/>
		</div>
		<div style="${
			!opt.image.editId ? 'display:none' : ''
		}" class="zodit-form__group">
			<label>Id</label>
			<input data-ref="id" type="text" class="zodit-input"/>
		</div>
		<div
			style="${!opt.image.editBorderRadius ? 'display:none' : ''}"
			class="zodit-form__group"
		>
			<label>${i18n('Border radius')}</label>
				<input data-ref="borderRadius" type="number" class="zodit-input"/>
		</div>`);
}
