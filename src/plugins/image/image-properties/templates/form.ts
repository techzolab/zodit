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

export function form(editor: IZodit): HTMLElement {
	const { showPreview, editSize } = editor.o.image,
		gi = Icon.get.bind(Icon);

	return editor.c.fromHTML(`<form class="zodit-properties">
		<div class="zodit-grid zodit-grid_xs-column">
			<div class="zodit_col-lg-2-5 zodit_col-xs-5-5">
				<div class="zodit-properties_view_box">
					<div style="${
						!showPreview ? 'display:none' : ''
					}" class="zodit-properties_image_view">
						<img data-ref="imageViewSrc" src="" alt=""/>
					</div>
					<div style="${
						!editSize ? 'display:none' : ''
					}" class="zodit-form__group zodit-properties_image_sizes">
						<input data-ref="imageWidth" type="text" class="zodit-input"/>
						<a data-ref="lockSize" class="zodit-properties__lock">${gi('lock')}</a>
						<input data-ref="imageHeight" type="text" class="imageHeight zodit-input"/>
					</div>
				</div>
			</div>
			<div data-ref="tabsBox" class="zodit_col-lg-3-5 zodit_col-xs-5-5"></div>
		</div>
	</form>`);
}
