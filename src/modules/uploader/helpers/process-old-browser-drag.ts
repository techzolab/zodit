/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/uploader
 */

import type { HandlerError, HandlerSuccess, IUploader } from 'zodit/types';
import { TEXT_PLAIN } from 'zodit/core/constants';
import { getContainer } from 'zodit/core/global';
import { attr, isZoditObject } from 'zodit/core/helpers';
import { Dom } from 'zodit/core/dom';
import { dataURItoBlob, sendFiles } from './index';

export function processOldBrowserDrag(
	self: IUploader,
	cData: DataTransfer | null,
	handlerSuccess?: HandlerSuccess,
	handlerError?: HandlerError,
	onFinally?: () => void
): void {
	if (cData && (!cData.types.length || cData.types[0] !== TEXT_PLAIN)) {
		const div = self.j.c.div('', {
			tabindex: -1,
			style:
				'left: -9999px; top: 0; width: 0; height: 100%;line-height: 140%; ' +
				'overflow: hidden; position: fixed; z-index: 2147483647; word-break: break-all;',
			contenteditable: true
		});

		getContainer(self.j, self.constructor).appendChild(div);

		const selection = isZoditObject(self.j) ? self.j.s.save() : null,
			restore = (): void | null | boolean =>
				selection && isZoditObject(self.j) && self.j.s.restore();

		div.focus();

		self.j.async.setTimeout(() => {
			const child: HTMLDivElement | null =
				div.firstChild as HTMLDivElement;

			Dom.safeRemove(div);

			if (child && child.hasAttribute('src')) {
				const src = attr(child, 'src') || '';

				restore();

				sendFiles(
					self,
					[dataURItoBlob(src) as File],
					handlerSuccess,
					handlerError
				).finally(onFinally);
			}
		}, self.j.defaultTimeout);
	}
}
