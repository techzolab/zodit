/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/about
 */

import './about.less';

import type { IControlType, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';
import { css, isLicense, normalizeLicense } from 'zodit/core/helpers/';
import * as constants from 'zodit/core/constants';
import { Dialog } from 'zodit/modules/dialog';

Config.prototype.controls.about = {
	exec: (editor: IZodit) => {
		const dialog = new Dialog({
				language: editor.o.language
			}),
			i = editor.i18n.bind(editor);

		dialog
			.setMod('theme', editor.o.theme)
			.setHeader(i('About Zodit'))
			.setContent(
				`<div class="zodit-about">
					<div>${i('Zodit Editor')} v.${editor.getVersion()}</div>
					<div>${i(
						'License: %s',
						!isLicense(editor.o.license)
							? 'MIT'
							: normalizeLicense(editor.o.license)
					)}</div>
					<div>
						<a href="${process.env.HOMEPAGE}" target="_blank">${process.env.HOMEPAGE}</a>
					</div>
					<div>
						<a href="https://techzolab.net/zodit/doc/" target="_blank">${i(
							"Zodit User's Guide"
						)}</a>
						${i('contains detailed help for using')}
					</div>
					<div>${i(
						'Copyright © TechzoLab.net - Nazrul Islam Nadeem. All rights reserved.'
					)}</div>
				</div>`
			);

		css(dialog.dialog, {
			minHeight: 200,
			minWidth: 420
		});

		dialog.open(true).bindDestruct(editor);
	},
	tooltip: 'About Zodit',
	mode: constants.MODE_SOURCE + constants.MODE_WYSIWYG
} as IControlType;

export function about(editor: IZodit): void {
	editor.registerButton({
		name: 'about',
		group: 'info'
	});
}
