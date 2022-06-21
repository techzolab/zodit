/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/image-editor
 */

import type { ImageEditorOptions, IViewBased } from 'zodit/types';
import { Icon } from 'zodit/core/ui';

const jie = 'zodit-image-editor';
const gi = Icon.get.bind(Icon);

const act = (el: boolean, className = 'jodti-image-editor_active'): string =>
	el ? className : '';

export const form = (
	editor: IViewBased,
	o: ImageEditorOptions
): HTMLElement => {
	const i = editor.i18n.bind(editor);

	const switcher = (
		label: string,
		ref: string,
		active: boolean = true
	): string => `<div class="zodit-form__group">
			<label>${i(label)}</label>

			<label class='zodit-switcher'>
				<input ${act(active, 'checked')} data-ref="${ref}" type="checkbox"/>
				<span class="zodit-switcher__slider"></span>
			</label>
	</div>`;

	return editor.create.fromHTML(`<form class="${jie} zodit-properties">
		<div class="zodit-grid zodit-grid_xs-column">
			<div class="zodit_col-lg-3-4 zodit_col-sm-5-5">
			${
				o.resize
					? `<div class="${jie}__area ${jie}__area_resize ${jie}_active">
							<div data-ref="resizeBox" class="${jie}__box"></div>
							<div class="${jie}__resizer">
								<i class="zodit_bottomright"></i>
							</div>
						</div>`
					: ''
			}
			${
				o.crop
					? `<div class="${jie}__area ${jie}__area_crop ${act(
							!o.resize
					  )}">
							<div data-ref="cropBox" class="${jie}__box">
								<div class="${jie}__croper">
									<i class="zodit_bottomright"></i>
									<i class="${jie}__sizes"></i>
								</div>
							</div>
						</div>`
					: ''
			}
			</div>
			<div class="zodit_col-lg-1-4 zodit_col-sm-5-5">
			${
				o.resize
					? `<div data-area="resize" class="${jie}__slider ${jie}_active">
							<div class="${jie}__slider-title">
								${gi('resize')}
								${i('Resize')}
							</div>
							<div class="${jie}__slider-content">
								<div class="zodit-form__group">
									<label>
										${i('Width')}
									</label>
									<input type="number" data-ref="widthInput" class="zodit-input"/>
								</div>
								<div class="zodit-form__group">
									<label>
										${i('Height')}
									</label>
									<input type="number" data-ref="heightInput" class="zodit-input"/>
								</div>
								${switcher('Keep Aspect Ratio', 'keepAspectRatioResize')}
							</div>
						</div>`
					: ''
			}
			${
				o.crop
					? `<div data-area="crop" class="${jie}__slider ${act(
							!o.resize
					  )}'">
							<div class="${jie}__slider-title">
								${gi('crop')}
								${i('Crop')}
							</div>
							<div class="${jie}__slider-content">
								${switcher('Keep Aspect Ratio', 'keepAspectRatioCrop')}
							</div>
						</div>`
					: ''
			}
			</div>
		</div>
	</form>`);
};
