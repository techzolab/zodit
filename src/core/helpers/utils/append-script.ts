/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/utils
 */

import type { IViewBased } from 'zodit/types';
import { completeUrl } from './complete-url';
import { isFunction } from '../checker/is-function';
import { isString } from '../checker/is-string';

export type Loader = (zodit: IViewBased, url: string) => Promise<any>;

export interface CallbackAndElement {
	callback: EventListener;
	element: HTMLElement;
}

const alreadyLoadedList = new Map<string, Promise<any>>();

const cacheLoaders = (loader: Loader): Loader => {
	return async (zodit: IViewBased, url: string): Promise<any> => {
		if (alreadyLoadedList.has(url)) {
			return alreadyLoadedList.get(url) as Promise<any>;
		}

		const promise = loader(zodit, url);

		alreadyLoadedList.set(url, promise);

		return promise;
	};
};

/**
 * Append script in document and call callback function after download
 */
export const appendScript = (
	zodit: IViewBased,
	url: string,
	callback: (this: HTMLElement, e?: Event) => any
): CallbackAndElement => {
	const script = zodit.c.element('script');

	script.type = 'text/javascript';
	script.async = true;

	if (isFunction(callback) && !zodit.isInDestruct) {
		zodit.e.on(script, 'load', callback);
	}

	if (!script.src) {
		script.src = completeUrl(url);
	}

	zodit.od.body.appendChild(script);

	return {
		callback,
		element: script
	};
};

/**
 * Load script and return promise
 */
export const appendScriptAsync = cacheLoaders(
	(zodit: IViewBased, url: string) => {
		return new Promise((resolve, reject) => {
			const { element } = appendScript(zodit, url, resolve);
			!zodit.isInDestruct && zodit.e.on(element, 'error', reject);
		});
	}
);

/**
 * Download CSS style script
 */
export const appendStyleAsync = cacheLoaders(
	(zodit: IViewBased, url: string): Promise<HTMLElement> => {
		return new Promise((resolve, reject) => {
			const link = zodit.c.element('link');

			link.rel = 'stylesheet';
			link.media = 'all';
			link.crossOrigin = 'anonymous';

			const callback = (): void => resolve(link);

			!zodit.isInDestruct &&
				zodit.e.on(link, 'load', callback).on(link, 'error', reject);

			link.href = completeUrl(url);

			if (zodit.o.shadowRoot) {
				zodit.o.shadowRoot.appendChild(link);
			} else {
				zodit.od.body.appendChild(link);
			}
		});
	}
);

export const loadNext = (
	zodit: IViewBased,
	urls: string[],
	i: number = 0
): Promise<void> => {
	if (!isString(urls[i])) {
		return Promise.resolve();
	}

	return appendScriptAsync(zodit, urls[i]).then(() =>
		loadNext(zodit, urls, i + 1)
	);
};

export const loadNextStyle = (
	zodit: IViewBased,
	urls: string[],
	i: number = 0
): Promise<void> => {
	if (!isString(urls[i])) {
		return Promise.resolve();
	}

	return appendStyleAsync(zodit, urls[i]).then(() =>
		loadNextStyle(zodit, urls, i + 1)
	);
};
