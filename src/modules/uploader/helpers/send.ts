/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/uploader
 */

import type { IDictionary, IUploader, IUploaderAnswer } from 'zodit/types';
import { Ajax } from 'zodit/core/request';
import { isFunction, isPromise } from 'zodit/core/helpers';
import { buildData } from 'zodit/modules/uploader/helpers/build-data';

export const ajaxInstances: WeakMap<IUploader, Set<Ajax>> = new WeakMap();

export function send(
	uploader: IUploader,
	data: FormData | IDictionary<string>
): Promise<IUploaderAnswer> {
	const requestData = buildData(uploader, data);

	const sendData = (
		request: FormData | IDictionary<string> | string
	): Promise<any> => {
		const ajax = new Ajax<IUploaderAnswer>(uploader.j, {
			xhr: (): XMLHttpRequest => {
				const xhr = new XMLHttpRequest();

				if (
					(uploader.j.ow as any).FormData !== undefined &&
					xhr.upload
				) {
					uploader.j.progressbar.show().progress(10);

					xhr.upload.addEventListener(
						'progress',
						evt => {
							if (evt.lengthComputable) {
								let percentComplete = evt.loaded / evt.total;

								percentComplete *= 100;

								console.log('progress', percentComplete);

								uploader.j.progressbar
									.show()
									.progress(percentComplete);

								if (percentComplete >= 100) {
									uploader.j.progressbar.hide();
								}
							}
						},
						false
					);
				} else {
					uploader.j.progressbar.hide();
				}

				return xhr;
			},
			method: uploader.o.method || 'POST',
			data: request,
			url: isFunction(uploader.o.url)
				? uploader.o.url(request)
				: uploader.o.url,
			headers: uploader.o.headers,
			queryBuild: uploader.o.queryBuild,
			contentType: uploader.o.contentType.call(uploader, request),
			dataType: uploader.o.format || 'json',
			withCredentials: uploader.o.withCredentials || false
		});

		let instances = ajaxInstances.get(uploader);

		if (!instances) {
			instances = new Set<Ajax>();
			ajaxInstances.set(uploader, instances);
		}

		instances.add(ajax);

		return ajax
			.send()
			.then(resp => resp.json())
			.catch(error => {
				uploader.o.error.call(uploader, error);
			})
			.finally(() => {
				instances?.delete(ajax);
			});
	};

	if (isPromise(requestData)) {
		return requestData.then(sendData).catch(error => {
			uploader.o.error.call(uploader, error);
		});
	}

	return sendData(requestData);
}
