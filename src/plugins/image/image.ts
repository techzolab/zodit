/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/image
 */

import type {
	IControlType,
	IFileBrowserCallBackData,
	IZodit
} from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { $$ } from 'zodit/core/helpers';
import { FileSelectorWidget } from 'zodit/modules/widget';
import { Config } from 'zodit/config';

Config.prototype.controls.image = {
	popup: (editor: IZodit, current, self, close) => {
		let sourceImage: HTMLImageElement | null = null;

		if (
			current &&
			!Dom.isText(current) &&
			Dom.isHTMLElement(current) &&
			(Dom.isTag(current, 'img') || $$('img', current).length)
		) {
			sourceImage = Dom.isTag(current, 'img')
				? current
				: $$('img', current)[0];
		}

		editor.s.save();

		return FileSelectorWidget(
			editor,
			{
				filebrowser: (data: IFileBrowserCallBackData) => {
					editor.s.restore();

					data.files &&
						data.files.forEach(file =>
							editor.s.insertImage(
								data.baseurl + file,
								null,
								editor.o.imageDefaultWidth
							)
						);

					close();
				},
				upload: true,
				url: async (url: string, text: string) => {
					editor.s.restore();

					if (/^[a-z\d_-]+(\.[a-z\d_-]+)+/i.test(url)) {
						url = '//' + url;
					}

					const image: HTMLImageElement =
						sourceImage || editor.createInside.element('img');

					image.setAttribute('src', url);
					image.setAttribute('alt', text);

					if (!sourceImage) {
						await editor.s.insertImage(
							image,
							null,
							editor.o.imageDefaultWidth
						);
					}

					close();
				}
			},
			sourceImage,
			close
		);
	},
	tags: ['img'],
	tooltip: 'Insert Image'
} as IControlType;

export function image(editor: IZodit): void {
	editor.registerButton({
		name: 'image',
		group: 'media'
	});
}
