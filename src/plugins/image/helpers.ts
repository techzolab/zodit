/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/image
 */

import { clearCenterAlign, css } from 'zodit/core/helpers';

/**
 * Align image
 */
export const hAlignElement = (
	image: HTMLElement,
	align: 'normal' | 'left' | 'right' | 'center' | ''
): void => {
	if (align && align !== 'normal') {
		if (align !== 'center') {
			css(image, 'float', align);
			clearCenterAlign(image);
		} else {
			css(image, {
				float: '',
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto'
			});
		}
	} else {
		if (
			css(image, 'float') &&
			['right', 'left'].indexOf(
				css(image, 'float').toString().toLowerCase()
			) !== -1
		) {
			css(image, 'float', '');
		}

		clearCenterAlign(image);
	}
};
