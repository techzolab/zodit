/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/speech/speech-recognize
 */

import type { IControlType, IZodit, IDictionary } from 'zodit/types';
import type { ISpeechRecognizeConstructor } from './interface';

import { Config } from 'zodit/config';
import { dataBind } from 'zodit/core/helpers/utils/data-bind';
import { isBoolean } from 'zodit/core/helpers/checker/is-boolean';
import { Alert } from 'zodit/modules/dialog/alert';

import { RecognizeManager } from './helpers/recognize-manager';
import { SpeechRecognition } from './helpers/api';

declare module 'zodit/config' {
	interface Config {
		speechRecognize: {
			readonly api: ISpeechRecognizeConstructor;

			/**
			 * Returns and sets the language of the current SpeechRecognition.
			 * If not specified, this defaults to the HTML lang attribute value, or
			 * the user agent's language setting if that isn't set either.
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang
			 */
			readonly lang?: string;

			/**
			 * Controls whether continuous results are returned for each recognition,
			 * or only a single result.
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous
			 */
			readonly continuous: boolean;

			/**
			 * Controls whether interim results should be returned (true) or not (false.)
			 * Interim results are results that are not yet final (e.g. the isFinal property is false.)
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
			 */
			readonly interimResults: boolean;

			/**
			 * On recognition error - make an error sound
			 */
			readonly sound: boolean;

			/**
			 * You can specify any commands in your language by listing them with the `|` sign.
			 * In the value, write down any commands for
			 * [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#parameters)
			 * and value (separated by ::)
			 * You can also use [custom Zodit commands](#need-article)
			 * For example
			 * ```js
			 * Zodit.make('#editor', {
			 *   speechRecognize: {
			 *     commands: {
			 *       'remove line|remove paragraph': 'backspaceSentenceButton',
			 *       'start bold': 'bold',
			 *       'insert table|create table': 'insertHTML::<table><tr><td>test</td></tr></table>',
			 *     }
			 *   }
			 * });
			 * ```
			 */
			readonly commands: IDictionary<string>;
		};
	}
}

Config.prototype.speechRecognize = {
	api: SpeechRecognition,
	sound: true,
	continuous: true,
	interimResults: true,
	commands: {
		'newline|enter': 'enter',
		'delete|remove word|delete word': 'backspaceWordButton',
		comma: 'inserthtml::,',
		underline: 'inserthtml::_',
		hyphen: 'inserthtml::-',
		space: 'inserthtml:: ',
		question: 'inserthtml::?',
		dot: 'inserthtml::.',
		'quote|quotes|open quote': "inserthtml::'",
		'header|header h1': 'formatblock::h1',
		'select all': 'selectall'
	}
};

Config.prototype.controls.speechRecognize = {
	isActive(zodit, _): boolean {
		const api = dataBind<RecognizeManager>(zodit, 'speech');
		return Boolean(api?.isEnabled);
	},

	isDisabled(zodit: IZodit): boolean {
		return !zodit.o.speechRecognize.api;
	},

	exec(zodit: IZodit, current, { button, control }): void {
		const {
			api: Api,
			lang,
			continuous,
			interimResults,
			sound
		} = zodit.o.speechRecognize;

		if (!Api) {
			Alert('Speech recognize API unsupported in your browser');
			return;
		}

		let api = dataBind<RecognizeManager>(zodit, 'speech');

		if (!api) {
			const nativeApi = new Api();
			api = new RecognizeManager(zodit.async, nativeApi);

			api.lang = lang;
			api.continuous = continuous;
			api.interimResults = interimResults;
			api.sound = sound;

			dataBind<RecognizeManager>(zodit, 'speech', api);

			api.on('pulse', (enable: boolean) => {
				button.setMod('pulse', enable);
			});

			api.on('result', (text: string): void =>
				zodit.e.fire('speechRecognizeResult', text)
			);

			api.on('progress', (text: string): void =>
				zodit.e.fire('speechRecognizeProgressResult', text)
			);

			button.hookStatus('beforeDestruct', () => {
				api.destruct();
			});
		}

		if (control.args) {
			const key = control.args[0] as
				| 'sound'
				| 'continuous'
				| 'interimResults';

			if (isBoolean(api[key])) {
				api[key] = !api[key];
				if (api.isEnabled) {
					api.restart();
				}
				return;
			}
		}

		api.toggle();
		button.state.activated = api.isEnabled;
	},

	icon: require('./icon.svg'),
	name: 'speechRecognize',
	command: 'toggleSpeechRecognize',
	tooltip: 'Speech Recognize',

	list: {
		sound: 'Sound',
		interimResults: 'Interim Results'
	},

	childTemplate(
		zodit: IZodit,
		key: 'sound' | 'interimResults',
		value: string
	): string {
		const api = dataBind<RecognizeManager>(zodit, 'speech'),
			checked = api?.[key] ?? zodit.o.speechRecognize[key];

		return `<span class='zodit-speech-recognize__list-item'><input ${
			checked ? 'checked' : ''
		} class='zodit-checkbox' type='checkbox'>&nbsp;${value}</span>`;
	},
	mods: {
		stroke: false
	}
} as IControlType;
