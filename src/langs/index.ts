/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:langs/README.md]]
 * @packageDocumentation
 * @module langs
 */

import type { IDictionary } from 'zodit/types';
import { isArray } from '../core/helpers/checker';

const en = require('./en');

let exp: IDictionary<IDictionary<string>> = {
	en
};

if (!process.env.EXCLUDE_LANGS) {
	exp = {
		en
	};
}

/* Unpack array to hash */
const get = (value: IDictionary): IDictionary => value.default || value,
	hashLang: IDictionary = {};

if (isArray(get(en))) {
	get(en).forEach((key: string, index: number) => {
		hashLang[index] = key;
	});
}

Object.keys(exp).forEach((lang: string) => {
	const list: unknown = get(exp[lang]);

	if (isArray(list)) {
		exp[lang] = {};

		list.forEach((value: string, index: number) => {
			exp[lang][hashLang[index]] = value;
		});
	}
});

export default exp;
