/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/backspace
 */

import type { IZodit } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';
import { Dom } from 'zodit/core/dom';
import { INVISIBLE_SPACE } from 'zodit/core/constants';
import { isFunction, trim } from 'zodit/core/helpers';
import { cases } from './cases';
import type { DeleteMode } from './interface';
import { checkNotCollapsed } from './cases/check-not-collapsed';

import './config';
import { moveNodeInsideStart } from 'zodit/src/core/selection/helpers';

export class Backspace extends Plugin {
	/** @override */
	override requires = ['hotkeys'];

	/** @override */
	protected afterInit(zodit: IZodit): void {
		zodit.e.on('afterCommand.delete', (command: 'delete' | string) => {
			if (command === 'delete') {
				this.afterDeleteCommand();
			}
		});

		zodit
			.registerCommand(
				'deleteButton',
				{
					exec: () => this.onDelete(false),
					hotkeys: zodit.o.delete.hotkeys.delete
				},
				{
					stopPropagation: false
				}
			)
			.registerCommand(
				'backspaceButton',
				{
					exec: () => this.onDelete(true),
					hotkeys: zodit.o.delete.hotkeys.backspace
				},
				{
					stopPropagation: false
				}
			)
			.registerCommand('deleteWordButton', {
				exec: () => this.onDelete(false, 'word'),
				hotkeys: zodit.o.delete.hotkeys.deleteWord
			})
			.registerCommand('backspaceWordButton', {
				exec: () => this.onDelete(true, 'word'),
				hotkeys: zodit.o.delete.hotkeys.backspaceWord
			})
			.registerCommand('deleteSentenceButton', {
				exec: () => this.onDelete(false, 'sentence'),
				hotkeys: zodit.o.delete.hotkeys.deleteSentence
			})
			.registerCommand('backspaceSentenceButton', {
				exec: () => this.onDelete(true, 'sentence'),
				hotkeys: zodit.o.delete.hotkeys.backspaceSentence
			});
	}

	/** @override */
	protected beforeDestruct(zodit: IZodit): void {
		zodit.e.off('afterCommand.delete');
	}

	/**
	 * After Delete command remove extra BR
	 */
	private afterDeleteCommand(): void {
		const zodit = this.j;

		const current = zodit.s.current();

		if (current && Dom.isTag(current.firstChild, 'br')) {
			zodit.s.removeNode(current.firstChild);
		}

		if (
			!trim(zodit.editor.textContent || '') &&
			!zodit.editor.querySelector('img,table,zodit,iframe,hr') &&
			(!current || !Dom.closest(current, 'table', zodit.editor))
		) {
			zodit.editor.innerHTML = '';

			const node = zodit.s.setCursorIn(zodit.editor);

			zodit.s.removeNode(node);
		}
	}

	/**
	 * Listener BackSpace or Delete button
	 */
	private onDelete(
		backspace: boolean,
		mode: DeleteMode = 'char'
	): false | void {
		const zodit = this.j;

		const sel = zodit.selection;

		if (!sel.isFocused()) {
			sel.focus();
		}

		if (checkNotCollapsed(zodit)) {
			return false;
		}

		const range = sel.range;
		const fakeNode = zodit.createInside.text(INVISIBLE_SPACE);

		try {
			range.insertNode(fakeNode);

			if (!Dom.isOrContains(zodit.editor, fakeNode)) {
				return;
			}

			moveNodeInsideStart(zodit, fakeNode, backspace);

			if (
				cases.some(
					(func): void | boolean =>
						isFunction(func) &&
						func(zodit, fakeNode, backspace, mode)
				)
			) {
				return false;
			}
		} catch (e) {
			if (!isProd) {
				console.error(e);
			}

			throw e;
		} finally {
			this.safeRemoveEmptyNode(fakeNode);
		}

		return false;
	}

	/**
	 * Remove node and replace cursor position out of it
	 */
	private safeRemoveEmptyNode(fakeNode: Node): void {
		const { range } = this.j.s;

		if (range.startContainer === fakeNode) {
			if (fakeNode.previousSibling) {
				if (Dom.isText(fakeNode.previousSibling)) {
					range.setStart(
						fakeNode.previousSibling,
						fakeNode.previousSibling.nodeValue?.length ?? 0
					);
				} else {
					range.setStartAfter(fakeNode.previousSibling);
				}
			} else if (fakeNode.nextSibling) {
				if (Dom.isText(fakeNode.nextSibling)) {
					range.setStart(fakeNode.nextSibling, 0);
				} else {
					range.setStartBefore(fakeNode.nextSibling);
				}
			}

			range.collapse(true);
			this.j.s.selectRange(range);
		}

		Dom.safeRemove(fakeNode);
	}
}
