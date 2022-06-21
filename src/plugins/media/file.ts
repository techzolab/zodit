/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/media
 */

import type {
	IControlType,
	IFileBrowserCallBackData,
	IZodit
} from 'zodit/types';
import { Config } from 'zodit/config';
import { Dom } from 'zodit/core/dom';
import { FileSelectorWidget } from 'zodit/modules/widget';

Config.prototype.controls.file = {
	popup: (
		editor: IZodit,
		current: Node | false,
		self: IControlType,
		close
	) => {
		const insert = (url: string, title: string = ''): void => {
			editor.s.insertNode(
				editor.createInside.fromHTML(
					`<a href="${url}" title="${title}">${title || url}</a>`
				)
			);
		};

		let sourceAnchor: HTMLAnchorElement | null = null;

		if (
			current &&
			(Dom.isTag(current, 'a') ||
				Dom.closest(current, 'a', editor.editor))
		) {
			sourceAnchor = Dom.isTag(current, 'a')
				? current
				: (Dom.closest(
						current,
						'a',
						editor.editor
				  ) as HTMLAnchorElement);
		}

		return FileSelectorWidget(
			editor,
			{
				filebrowser: (data: IFileBrowserCallBackData) => {
					data.files &&
						data.files.forEach(file => insert(data.baseurl + file));

					close();
				},
				upload: true,
				url: (url: string, text: string) => {
					if (sourceAnchor) {
						sourceAnchor.setAttribute('href', url);
						sourceAnchor.setAttribute('title', text);
					} else {
						insert(url, text);
					}
					close();
				}
			},
			sourceAnchor,
			close,
			false
		);
	},
	tags: ['a'],
	tooltip: 'Insert file'
} as IControlType;

export function file(editor: IZodit): void {
	editor.registerButton({
		name: 'file',
		group: 'media'
	});
}
