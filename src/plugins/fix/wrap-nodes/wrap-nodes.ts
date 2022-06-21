/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:plugins/fix/wrap-nodes/README.md]]
 * @packageDocumentation
 * @module plugins/fix/wrap-nodes
 */

import type { IZodit, Nullable } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';
import { Dom } from 'zodit/core/dom';
import { isString } from 'zodit/core/helpers/checker/is-string';
import { autobind } from 'zodit/core/decorators';

import './config';

/**
 * Wrap single text nodes in block wrapper
 */
export class WrapNodes extends Plugin {
	/** @override **/
	protected afterInit(zodit: IZodit): void {
		if (zodit.o.enter.toLowerCase() === 'br') {
			return;
		}

		zodit.e.on(
			'afterInit.wtn postProcessSetEditorValue.wtn',
			this.postProcessSetEditorValue
		);
	}

	/** @override **/
	protected beforeDestruct(zodit: IZodit): void {
		zodit.e.off('.wtn');
	}

	/**
	 * Process changed value
	 */
	@autobind
	private postProcessSetEditorValue(): void {
		const { zodit } = this;

		if (!zodit.isEditorMode()) {
			return;
		}

		let child: Nullable<Node> = zodit.editor.firstChild,
			isChanged: boolean = false;

		while (child) {
			this.checkAloneListLeaf(child, zodit);

			if (this.isSuitableStart(child)) {
				if (!isChanged) {
					zodit.s.save();
				}

				isChanged = true;
				const box = zodit.createInside.element(zodit.o.enter);

				Dom.before(child, box);

				while (child && this.isSuitable(child)) {
					const next: Nullable<Node> = child.nextSibling;
					box.appendChild(child);
					child = next;
				}

				box.normalize();
			}

			child = child && child.nextSibling;
		}

		if (isChanged) {
			zodit.s.restore();

			if (zodit.e.current === 'afterInit') {
				zodit.e.fire('internalChange');
			}
		}
	}

	private checkAloneListLeaf(
		child: Node | Element | HTMLLIElement,
		zodit: IZodit
	): void {
		if (
			Dom.isElement(child) &&
			Dom.isTag(child, 'li') &&
			!Dom.isTag(child.parentElement, ['ul', 'ol'])
		) {
			Dom.wrap(child, 'ul', zodit.createInside);
		}
	}

	/**
	 * Found Node which should be wrapped
	 */
	private isSuitableStart = (n: Nullable<Node>): boolean =>
		(Dom.isText(n) && isString(n.nodeValue) && /[^\s]/.test(n.nodeValue)) ||
		(this.isNotClosed(n) && !Dom.isTemporary(n));

	/**
	 * Node should add in block element
	 */
	private isSuitable = (n: Nullable<Node>): boolean =>
		Dom.isText(n) || this.isNotClosed(n);

	/**
	 * Some element which need append in block
	 */
	private isNotClosed = (n: Nullable<Node>): n is Element =>
		Dom.isElement(n) &&
		!(Dom.isBlock(n) || Dom.isTag(n, this.j.o.wrapNodes.exclude));
}
