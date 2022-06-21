/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/speech/speech-recognize
 */

import type { ISpeechRecognizeConstructor } from '../interface';

export const SpeechRecognition: ISpeechRecognizeConstructor =
	(window as any).SpeechRecognition ||
	(window as any).webkitSpeechRecognition;
