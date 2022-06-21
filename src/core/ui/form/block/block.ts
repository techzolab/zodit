/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui/form/block
 */

import './block.less';

import type { IUIElement, IViewBased } from 'zodit/types';
import { UIGroup } from 'zodit/core/ui/group/group';
import { attr } from 'zodit/core/helpers/utils';
import { component } from 'zodit/core/decorators/component/component';

@component
export class UIBlock extends UIGroup {
	/** @override */
	override className(): string {
		return 'UIBlock';
	}

	constructor(
		zodit: IViewBased,
		elements?: Array<IUIElement | void | null | false>,
		override readonly options: {
			className?: string;
			align?: 'center' | 'left' | 'right' | 'full';
			width?: 'full';
			ref?: string;
			mod?: string;
		} = {
			align: 'left'
		}
	) {
		super(zodit, elements);

		this.setMod('align', this.options.align || 'left');
		this.setMod('width', this.options.width || '');
		this.options.mod && this.setMod(this.options.mod, true);
		this.options.className &&
			this.container.classList.add(this.options.className);

		attr(this.container, 'data-ref', options.ref);
		attr(this.container, 'ref', options.ref);
	}
}
