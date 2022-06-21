/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/clean-html
 */

import type { IDictionary } from 'zodit/types';
import { isString, trim } from 'zodit/core/helpers';

/**
 * @private
 */
export function getHash(
	tags: false | string | IDictionary<string>
): IDictionary | false {
	const attributesReg = /([^[]*)\[([^\]]+)]/;
	const separator = /[\s]*,[\s]*/,
		attrReg = /^(.*)[\s]*=[\s]*(.*)$/;

	const tagsHash: IDictionary = {};

	if (isString(tags)) {
		tags.split(separator).map((elm: string) => {
			elm = trim(elm);
			const attr: RegExpExecArray | null = attributesReg.exec(elm),
				allowAttributes: IDictionary<string | boolean> = {},
				attributeMap = (attrName: string): void => {
					attrName = trim(attrName);

					const val: string[] | null = attrReg.exec(attrName);

					if (val) {
						allowAttributes[val[1]] = val[2];
					} else {
						allowAttributes[attrName] = true;
					}
				};

			if (attr) {
				const attr2: string[] = attr[2].split(separator);

				if (attr[1]) {
					attr2.forEach(attributeMap);
					tagsHash[attr[1].toUpperCase()] = allowAttributes;
				}
			} else {
				tagsHash[elm.toUpperCase()] = true;
			}
		});

		return tagsHash;
	}

	if (tags) {
		Object.keys(tags).forEach(tagName => {
			tagsHash[tagName.toUpperCase()] = tags[tagName];
		});

		return tagsHash;
	}

	return false;
}
