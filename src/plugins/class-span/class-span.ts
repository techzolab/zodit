/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/class-span
 */

import type { IControlType, IZodit } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';
import { Config } from 'zodit/config';
import { Dom } from 'zodit/core/dom';
import { memorizeExec } from 'zodit/core/helpers';

Config.prototype.controls.classSpan = {
	command: 'applyClassName',

	icon: require('./icon.svg'),

	exec: memorizeExec,

	list: [
		'enabled',
		'disabled',
		'activated',
		'text-left',
		'text-center',
		'text-right',
		'warning',
		'error'
	],

	isChildActive: (editor: IZodit, control: IControlType): boolean => {
		const current = editor.s.current();

		if (current) {
			const currentBpx: HTMLElement =
				(Dom.closest(
					current,
					Dom.isElement,
					editor.editor
				) as HTMLElement) || editor.editor;

			return Boolean(
				control.args &&
					currentBpx.classList.contains(control.args[0].toString())
			);
		}

		return false;
	},

	isActive: (editor: IZodit, control: IControlType): boolean => {
		const current = editor.s.current();

		if (current) {
			const currentBpx: HTMLElement =
				(Dom.closest(
					current,
					Dom.isElement,
					editor.editor
				) as HTMLElement) || editor.editor;

			let present: boolean = false;

			control.list &&
				Object.keys(control.list).forEach((className: string) => {
					if (currentBpx.classList.contains(className)) {
						present = true;
					}
				});

			return Boolean(
				currentBpx &&
					currentBpx !== editor.editor &&
					control.list !== undefined &&
					present
			);
		}

		return false;
	},

	childTemplate: (e: IZodit, key: string, value: string) =>
		`<span class="${key}">${e.i18n(value)}</span>`,

	tooltip: 'Insert className'
} as IControlType;

/**
 * Applying some className to selected text.
 * @example
 * ```js
 * const editor = Zodit.make('#editor', {
 *	controls: {
 *		classSpan: {
 *			list: {
 *				class1: 'Classe 1',
 *				class2: 'Classe 2',
 *				class3: 'Classe 3',
 *				class4: 'Classe 4',
 *				class5: 'Classe 5'
 *			}
 *		}
 *	}
 * });
 * ```
 */
export class classSpan extends Plugin {
	/** @override */
	override buttons: Plugin['buttons'] = [
		{
			name: 'classSpan',
			group: 'font'
		}
	];

	/** @override */
	protected override afterInit(zodit: IZodit): void {
		zodit.registerCommand(
			'applyClassName',
			(command: string, second: string, third: string): false => {
				zodit.s.applyStyle(undefined, {
					className: third
				});

				return false;
			}
		);
	}

	/** @override */
	protected override beforeDestruct(): void {}
}
