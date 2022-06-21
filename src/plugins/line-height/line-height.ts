/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:plugins/line-height/README.md]]
 * @packageDocumentation
 * @module plugins/line-height
 */

import type { IZodit } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';

import './config';
import { css } from '../../core/helpers';
import { autobind } from 'zodit/core/decorators';
import { Dom } from 'zodit/core/dom';

export class lineHeight extends Plugin {
	override buttons: Plugin['buttons'] = [
		{
			name: 'lineHeight',
			group: 'font'
		}
	];

	protected afterInit(zodit: IZodit): void {
		css(zodit.editor, {
			lineHeight: zodit.o.defaultLineHeight
		});

		zodit.registerCommand('applyLineHeight', this.applyLineHeight);
	}

	@autobind
	private applyLineHeight(ignore: string, ignoreA: any, value: any): void {
		const { s, createInside: c, editor: root, o } = this.j;

		if (!s.isFocused()) {
			s.focus();
		}
		s.save();

		let addStyle: boolean | undefined;

		const apply = (node: Node): void => {
			let parentBlock = Dom.closest(node, Dom.isBlock, root);

			if (!parentBlock) {
				parentBlock = Dom.wrap(node, o.enter, c);
			}

			const previousValue = css(parentBlock, 'lineHeight');

			if (addStyle === undefined) {
				addStyle = previousValue.toString() !== value.toString();
			}

			css(parentBlock, 'lineHeight', addStyle ? value : null);
		};

		try {
			if (s.isCollapsed()) {
				const fake = c.fake();
				s.insertNode(fake, false, false);
				apply(fake);
				Dom.safeRemove(fake);
			} else {
				s.eachSelection(apply);
			}
		} finally {
			s.restore();
		}
	}

	protected beforeDestruct(zodit: IZodit): void {
		css(zodit.editor, {
			lineHeight: null
		});
	}
}
