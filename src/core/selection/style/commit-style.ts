/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module selection
 */

import type { HTMLTagNames, IZodit, IStyleOptions } from 'zodit/types';
import { IS_BLOCK } from 'zodit/core/constants';
import { ApplyStyle } from './apply-style';

export const WRAP = 'wrap';
export const UNWRAP = 'unwrap';
export const CHANGE = 'change';
export const UNSET = 'unset';
export const INITIAL = 'initial';
export const REPLACE = 'replace';

export class CommitStyle {
	get elementIsList(): boolean {
		return Boolean(
			this.options.element && ['ul', 'ol'].includes(this.options.element)
		);
	}

	get element(): HTMLTagNames {
		return this.options.element || this.defaultTag;
	}

	/**
	 * New element is block
	 */
	get elementIsBlock(): boolean {
		return Boolean(
			this.options.element && IS_BLOCK.test(this.options.element)
		);
	}

	/**
	 * The commit applies the tag change
	 */
	get isElementCommit(): boolean {
		return Boolean(
			this.options.element &&
				this.options.element !== this.options.defaultTag
		);
	}

	get defaultTag(): HTMLTagNames {
		if (this.options.defaultTag) {
			return this.options.defaultTag;
		}

		return this.elementIsBlock ? 'p' : 'span';
	}

	get elementIsDefault(): Boolean {
		return this.element === this.defaultTag;
	}

	constructor(readonly options: IStyleOptions) {}

	apply(zodit: IZodit): void {
		ApplyStyle(zodit, this);
	}
}
