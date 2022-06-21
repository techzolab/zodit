/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module global
 */

import type {
	HTMLTagNames,
	IComponent,
	IDictionary,
	IZodit,
	IViewBased,
	IViewComponent
} from 'zodit/types';

import { PluginSystem } from './plugin/plugin-system';

import { Dom } from './dom';

import { EventEmitter } from './event-emitter';
import { isZoditObject } from './helpers/checker/is-zodit-object';
import { isViewObject } from './helpers/checker/is-view-object';
import { getClassName } from './helpers/utils/get-class-name';
import { kebabCase } from './helpers/string/kebab-case';
import { lang } from './constants';

export const instances: IDictionary<IZodit> = {};

let counter = 1;

const uuids = new Set();
/**
 * Generate global unique uid
 */
export function uniqueUid(): string {
	function gen(): string {
		counter += 10 * (Math.random() + 1);
		return Math.round(counter).toString(16);
	}

	let uid = gen();
	while (uuids.has(uid)) {
		uid = gen();
	}
	uuids.add(uid);

	return uid;
}

export const pluginSystem = new PluginSystem();

export const modules: IDictionary<Function> = {};

export const extendLang = (langs: IDictionary): void => {
	Object.keys(langs).forEach(key => {
		if (lang[key]) {
			Object.assign(lang[key], langs[key]);
		} else {
			lang[key] = langs[key];
		}
	});
};

const boxes = new WeakMap<IComponent, IDictionary<HTMLElement>>();

/**
 * Create unique box(HTMLCotainer) and remove it after destroy
 */
export function getContainer<T extends HTMLTagNames = HTMLTagNames>(
	zodit: IViewBased | IViewComponent,
	classFunc?: Function,
	tag: T = 'div' as T,
	createInsideEditor: boolean = false
): HTMLElementTagNameMap[T] {
	const name = classFunc ? getClassName(classFunc.prototype) : 'zodit-utils';

	const data = boxes.get(zodit) || {},
		key = name + tag;

	const view = isViewObject(zodit) ? zodit : zodit.j;

	if (!data[key]) {
		let c = view.c,
			body =
				isZoditObject(zodit) && zodit.o.shadowRoot
					? zodit.o.shadowRoot
					: zodit.od.body;

		if (
			createInsideEditor &&
			isZoditObject(zodit) &&
			zodit.od !== zodit.ed
		) {
			c = zodit.createInside;
			const place = tag === 'style' ? zodit.ed.head : zodit.ed.body;

			body =
				isZoditObject(zodit) && zodit.o.shadowRoot
					? zodit.o.shadowRoot
					: place;
		}

		const box = c.element(tag, {
			className: `zodit zodit-${kebabCase(name)}-container zodit-box`
		});

		box.classList.add(`zodit_theme_${view.o.theme || 'default'}`);

		body.appendChild(box);

		data[key] = box;

		zodit.hookStatus('beforeDestruct', () => {
			Dom.safeRemove(box);
			delete data[key];

			if (Object.keys(data).length) {
				boxes.delete(zodit);
			}
		});

		boxes.set(zodit, data);
	}

	data[key].classList.remove('zodit_theme_default', 'zodit_theme_dark');
	data[key].classList.add(`zodit_theme_${view.o.theme || 'default'}`);

	return data[key] as HTMLElementTagNameMap[T];
}

/**
 * Global event emitter
 */
export const eventEmitter = new EventEmitter();
