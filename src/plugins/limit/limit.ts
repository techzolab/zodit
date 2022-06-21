/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/limit
 */

import type { IZodit, SnapshotType } from 'zodit/types';
import { Config } from 'zodit/config';
import { Plugin } from 'zodit/core/plugin';
import {
	COMMAND_KEYS,
	INVISIBLE_SPACE_REG_EXP,
	SPACE_REG_EXP
} from 'zodit/core/constants';
import { stripTags } from 'zodit/core/helpers';
import { autobind } from 'zodit/core/decorators';

declare module 'zodit/config' {
	interface Config {
		/**
		 * limit words count
		 */
		limitWords: false | number;

		/**
		 * limit chars count
		 */
		limitChars: false | number;

		/**
		 * limit html chars count
		 */
		limitHTML: false;
	}
}

Config.prototype.limitWords = false;
Config.prototype.limitChars = false;
Config.prototype.limitHTML = false;

/**
 * Plugin control for chars or words count
 */
export class limit extends Plugin {
	/** @override **/
	protected afterInit(zodit: IZodit): void {
		const { limitWords, limitChars } = zodit.o;

		if (zodit && (limitWords || limitChars)) {
			let snapshot: SnapshotType | null = null;

			zodit.e
				.off('.limit')
				.on('beforePaste.limit', () => {
					snapshot = zodit.history.snapshot.make();
				})
				.on(
					'keydown.limit keyup.limit beforeEnter.limit beforePaste.limit',
					this.checkPreventKeyPressOrPaste
				)
				.on('change.limit', this.checkPreventChanging)
				.on('afterPaste.limit', (): false | void => {
					if (this.shouldPreventInsertHTML() && snapshot) {
						zodit.history.snapshot.restore(snapshot);
						return false;
					}
				});
		}
	}

	/**
	 * Action should be prevented
	 */
	private shouldPreventInsertHTML(
		event: KeyboardEvent | null = null,
		inputText: string = ''
	): boolean {
		if (event && COMMAND_KEYS.includes(event.key)) {
			return false;
		}

		const { zodit } = this;
		const { limitWords, limitChars } = zodit.o;
		const text =
			inputText || (zodit.o.limitHTML ? zodit.value : zodit.text);

		const words = this.splitWords(text);

		if (limitWords && words.length >= limitWords) {
			return true;
		}

		return Boolean(limitChars) && words.join('').length >= limitChars;
	}

	/**
	 * Check if some keypress or paste should be prevented
	 */
	@autobind
	private checkPreventKeyPressOrPaste(event: KeyboardEvent): void | false {
		if (this.shouldPreventInsertHTML(event)) {
			return false;
		}
	}

	/**
	 * Check if some external changing should be prevented
	 */
	@autobind
	private checkPreventChanging(newValue: string, oldValue: string): void {
		const { zodit } = this;
		const { limitWords, limitChars } = zodit.o;

		const text = zodit.o.limitHTML ? newValue : stripTags(newValue),
			words = this.splitWords(text);

		if (
			(limitWords && words.length > limitWords) ||
			(Boolean(limitChars) && words.join('').length > limitChars)
		) {
			zodit.value = oldValue;
		}
	}

	/**
	 * Split text on words without technical characters
	 */
	private splitWords(text: string): string[] {
		return text
			.replace(INVISIBLE_SPACE_REG_EXP(), '')
			.split(SPACE_REG_EXP())
			.filter(e => e.length);
	}

	/** @override **/
	protected beforeDestruct(zodit: IZodit): void {
		zodit.e.off('.limit');
	}
}
