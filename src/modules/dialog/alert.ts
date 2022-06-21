/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/dialog
 */

import { Dialog } from './dialog';
import { asArray, isFunction } from 'zodit/core/helpers/';
import { Dom } from 'zodit/core/dom';
import { Button } from 'zodit/core/ui';

/**
 * Show `alert` dialog. Work without Zodit object
 * @example
 * ```javascript
 * Zodit.Alert("File was uploaded");
 * Zodit.Alert("File was uploaded", "Message");
 * Zodit.Alert("File was uploaded", function() {
 *    $('form').hide();
 * });
 * Zodit.Alert("File wasn't uploaded", "Error", function() {
 *    $('form').hide();
 * });
 * ```
 */
export const Alert = (
	msg: string | HTMLElement,
	title?: string | (() => void | false),
	callback?: string | ((dialog: Dialog) => void | false),
	className: string = 'zodit-dialog_alert'
): Dialog => {
	if (isFunction(title)) {
		callback = title;
		title = undefined;
	}
	const dialog = new Dialog(),
		container = dialog.c.div(className),
		okButton = Button(dialog, 'ok', 'Ok');

	asArray(msg).forEach(oneMessage => {
		container.appendChild(
			Dom.isNode(oneMessage) ? oneMessage : dialog.c.fromHTML(oneMessage)
		);
	});

	okButton.onAction(() => {
		if (!callback || !isFunction(callback) || callback(dialog) !== false) {
			dialog.close();
		}
	});

	dialog.setFooter([okButton]);

	dialog.open(container, (title as string) || '&nbsp;', true, true);
	okButton.focus();

	return dialog;
};
