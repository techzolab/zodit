/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

describe('Test table plugin', () => {
	describe('Click button and click to some cell', () => {
		it('should create and insert new table', () => {
			const editor = getZodit();
			clickButton('table', editor);
			const popup = getOpenedPopup(editor);
			simulateEvent(
				'mousedown',
				popup.querySelector('span[data-index="6"]')
			);
			expect(sortAttributes(editor.value)).eq(
				'\n<table style="border-collapse:collapse;width:100%"><tbody>\n<tr>\n\t<td style="width:14.28%"><br></td>\n\t<td style="width:14.28%"><br></td>\n\t<td style="width:14.28%"><br></td>\n\t<td style="width:14.28%"><br></td>\n\t<td style="width:14.28%"><br></td>\n\t<td style="width:14.28%"><br></td>\n\t<td style="width:14.28%"><br></td></tr></tbody></table>'
			);
		});
	});

	describe('Set different cell style', () => {
		it('should create cells with that style', () => {
			const editor = getZodit({
				createAttributes: {
					td: {
						style: 'color: red;'
					}
				}
			});
			clickButton('table', editor);
			const popup = getOpenedPopup(editor);
			simulateEvent(
				'mousedown',
				popup.querySelector('span[data-index="2"]')
			);
			expect(sortAttributes(editor.value)).eq(
				'\n<table style="border-collapse:collapse;width:100%"><tbody>\n<tr>\n\t<td style="color:red;width:33.33%"><br></td>\n\t<td style="color:red;width:33.33%"><br></td>\n\t<td style="color:red;width:33.33%"><br></td></tr></tbody></table>'
			);
		});
	});
});
