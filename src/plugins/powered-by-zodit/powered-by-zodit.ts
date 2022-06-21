/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/powered-by-zodit
 */

import type { IZodit } from 'zodit/types';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Hide the link to the Zodit site at the bottom of the editor
		 */
		hidePoweredByZodit: boolean;
	}
}

export function poweredByZodit(zodit: IZodit): void {
	if (
		!zodit.o.hidePoweredByZodit &&
		!zodit.o.inline &&
		(zodit.o.showCharsCounter ||
			zodit.o.showWordsCounter ||
			zodit.o.showXPathInStatusbar)
	) {
		zodit.hookStatus('ready', () => {
			zodit.statusbar.append(
				zodit.create.fromHTML(
					`<a
						tabindex="-1"
						style="text-transform: uppercase"
						class="zodit-status-bar-link"
						href="javascript:;">
							Powered by m4yours
						</a>`
				),
				true
			);
		});
	}
}
