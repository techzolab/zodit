/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:plugins/select/README.md]]
 * @packageDocumentation
 * @module plugins/select
 */

import type { IZodit, Nullable } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';
import { autobind, watch } from 'zodit/core/decorators';
import { camelCase } from 'zodit/core/helpers/string/camel-case';
import { Dom } from 'zodit/core/dom';
import { Popup, UIElement } from 'zodit/core/ui';

import './config';

/* eslint-disable tsdoc/syntax */

/**
 * A utility plugin that allows you to subscribe to a click/mousedown/touchstart/mouseup on an element in DOM order
 *
 * @example
 * ```js
 * const editor = Zodit.make('#editor');
 * editor.e.on('clickImg', (img) => {
 *   console.log(img.src);
 * })
 * ```
 */
export class select extends Plugin {
	private proxyEventsList = [
		'click',
		'mousedown',
		'touchstart',
		'mouseup',
		'touchend'
	];

	/** @override */
	protected afterInit(zodit: IZodit): void {
		this.proxyEventsList.forEach(eventName => {
			zodit.e.on(eventName + '.select', this.onStartSelection);
		});
	}

	/** @override */
	protected beforeDestruct(zodit: IZodit): void {
		this.proxyEventsList.forEach(eventName => {
			zodit.e.on(eventName + '.select', this.onStartSelection);
		});
	}

	@autobind
	private onStartSelection(e: MouseEvent): void {
		const { j } = this;

		let result,
			target = e.target as Nullable<Node>;

		while (result === undefined && target && target !== j.editor) {
			result = j.e.fire(
				camelCase(e.type + '_' + target.nodeName.toLowerCase()),
				target,
				e
			);

			target = target.parentElement;
		}

		if (e.type === 'click' && result === undefined && target === j.editor) {
			j.e.fire(e.type + 'Editor', target, e);
		}
	}

	/**
	 * @event outsideClick(e) - when user clicked in the outside of editor
	 */
	@watch('ow:click')
	protected onOutsideClick(e: MouseEvent): void {
		const node = e.target as Node;

		if (Dom.up(node, elm => elm === this.j.editor)) {
			return;
		}

		const box = UIElement.closestElement(node, Popup);

		if (!box) {
			this.j.e.fire('outsideClick', e);
		}
	}

	@watch([':beforeCommand'])
	protected beforeCommandCut(command: string): void {
		const { s } = this.j;

		if (command === 'cut' && !s.isCollapsed()) {
			const current = s.current();
			if (current && Dom.isOrContains(this.j.editor, current)) {
				this.onCopyNormalizeSelectionBound();
			}
		}
	}

	@watch([':copy', ':cut'])
	protected onCopyNormalizeSelectionBound(e?: ClipboardEvent): void {
		const { s, editor, o } = this.j;

		if (!o.select.normalizeSelectionBeforeCutAndCopy || s.isCollapsed()) {
			return;
		}

		if (
			e &&
			(!e.isTrusted ||
				!Dom.isNode(e.target) ||
				!Dom.isOrContains(editor, e.target))
		) {
			return;
		}

		this.zodit.s.expandSelection();
	}
}
