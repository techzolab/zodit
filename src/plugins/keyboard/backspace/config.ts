/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/backspace
 */

import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		delete: {
			hotkeys: {
				delete: string[];
				deleteWord: string[];
				deleteSentence: string[];
				backspace: string[];
				backspaceWord: string[];
				backspaceSentence: string[];
			};
		};
	}
}

Config.prototype.delete = {
	hotkeys: {
		delete: ['delete', 'cmd+backspace'],
		deleteWord: ['ctrl+delete', 'cmd+alt+backspace', 'ctrl+alt+backspace'],
		deleteSentence: ['ctrl+shift+delete', 'cmd+shift+delete'],
		backspace: ['backspace'],
		backspaceWord: ['ctrl+backspace'],
		backspaceSentence: ['ctrl+shift+backspace', 'cmd+shift+backspace']
	}
};
