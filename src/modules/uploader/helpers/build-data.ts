/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/uploader
 */

import type { BuildDataResult, IDictionary, IUploader } from 'zodit/types';
import { isFunction, isString } from 'zodit/core/helpers';

export function buildData(
	uploader: IUploader,
	data: FormData | IDictionary<string> | string
): BuildDataResult {
	if (isFunction(uploader.o.buildData)) {
		return uploader.o.buildData.call(uploader, data);
	}

	const FD: typeof FormData = (uploader.ow as any).FormData;

	if (FD !== undefined) {
		if (data instanceof FD) {
			return data;
		}

		if (isString(data)) {
			return data;
		}

		const newData = new FD();

		Object.keys(data).forEach(key => {
			newData.append(key, data[key]);
		});

		return newData;
	}

	return data;
}
