/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module selection
 */

import type { IZodit, Nullable, CanUndef, CommitMode } from 'zodit/types';
import type { CommitStyle } from './commit-style';
import { normalizeNode } from 'zodit/core/helpers';
import {
	getSuitParent,
	getSuitChild,
	isInsideInvisibleElement,
	toggleCommitStyles,
	unwrapChildren
} from './api';
import { CHANGE, INITIAL, REPLACE, UNWRAP, WRAP } from './commit-style';
import { Dom } from 'zodit/core/dom';
import {
	toggleOrderedList,
	wrapAndCommitStyle,
	isSuitElement,
	extractSelectedPart,
	toggleCSS,
	FiniteStateMachine
} from './api';

export function ApplyStyle(zodit: IZodit, cs: CommitStyle): void {
	const { s: sel, editor } = zodit;

	const fsm = new FiniteStateMachine('start', {
		start: {
			start(): void {
				sel.save();
				normalizeNode(editor.firstChild); // FF fix for test "commandsTest - Exec command "bold"
				this.setState('generator');
			}
		},

		generator: {
			initGenerator(): Generator {
				return zodit.s.wrapInTagGen();
			},

			nextFont(gen: Generator<HTMLElement>): CanUndef<HTMLElement> {
				const font = gen.next();

				if (font.done) {
					this.setState('end');
					return;
				}

				if (
					isInsideInvisibleElement(font.value, editor) ||
					Dom.isEmptyContent(font.value)
				) {
					return;
				}

				this.setState('check');

				return font.value;
			}
		},

		check: {
			work(font: HTMLElement): Nullable<HTMLElement> {
				let elm =
					getSuitParent(cs, font, zodit.editor) ||
					getSuitChild(cs, font);

				if (elm) {
					this.setState('wholeElement');
					return elm;
				}

				elm = Dom.closest(
					font,
					node => isSuitElement(cs, node, true),
					zodit.editor
				);

				if (elm) {
					if (!cs.elementIsBlock) {
						extractSelectedPart(elm, font, zodit);
					}
				}

				if (cs.elementIsList && Dom.isTag(elm, ['ul', 'ol'])) {
					this.setState('orderList');
					return font;
				}

				if (elm) {
					this.setState('wholeElement');
					return elm;
				}

				if (unwrapChildren(cs, font)) {
					this.setState('endProcess');
					return null;
				}

				this.setState('wrap');
				return font;
			}
		},

		wholeElement: {
			toggleStyles(toggleElm: HTMLElement): void {
				let mode: CommitMode = INITIAL;

				if (toggleCommitStyles(cs, toggleElm)) {
					mode = UNWRAP;
				} else {
					mode = toggleCSS(cs, toggleElm, zodit, mode);
				}

				this.setState('generator', mode);
			}
		},

		orderList: {
			toggleStyles(font: HTMLElement): void {
				let mode: CommitMode = INITIAL;
				const li = Dom.closest(font, 'li', zodit.editor);

				if (!li) {
					this.setState('generator');
					return;
				}

				const ul = Dom.closest(font, ['ul', 'ol'], zodit.editor);

				if (!ul) {
					this.setState('generator');
					return;
				}

				mode = toggleOrderedList(cs, li, zodit, mode);

				if (mode === REPLACE || mode === UNWRAP || mode === CHANGE) {
					this.setState('endWhile');
					return;
				}

				this.setState('generator');
			}
		},

		wrap: {
			toggleStyles(font: HTMLElement): void {
				if (this.getSubState() !== 'unwrap') {
					const toggleElm = wrapAndCommitStyle(cs, font, zodit);
					toggleCSS(cs, toggleElm, zodit, WRAP);
				}

				this.setState('generator');
			}
		},

		endWhile: {
			nextFont(gen: Generator<HTMLElement>): void {
				const font = gen.next();

				if (font.done) {
					this.setState('end');
				}
			}
		},

		endProcess: {
			toggleStyles(): void {
				this.setState('generator');
			}
		},

		end: {
			finalize(): void {
				sel.restore();
			}
		}
	});

	fsm.dispatch('start');

	const gen = fsm.dispatch('initGenerator');

	while (fsm.getState() !== 'end') {
		const font = fsm.dispatch<HTMLElement>('nextFont', gen);

		if (font) {
			const wrapper = fsm.dispatch<HTMLElement>('work', font);
			fsm.dispatch('toggleStyles', wrapper);
		}
	}

	fsm.dispatch('finalize', gen);
}
