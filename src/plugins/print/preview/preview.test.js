/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

describe('Preview plugin', () => {
	[
		[
			'<p>text</p><table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>',
			'<p>text</p><table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>'
		],
		[
			'<p>sdasdas <span style="font-size: 36px;">dasd</span> asd asd</p>',
			'<p>sdasdas <span style="font-size: 36px;">dasd</span> asd asd</p>'
		],
		[
			'<script>console.log(111);</script><p>111</p>',
			'<script>console.log(111);</script><p>111</p>'
		],
		[
			'<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table><p>111</p>',
			'<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table><p>111</p>'
		]
	].forEach(([source, result]) => {
		describe('For source ' + source, () => {
			it('should show the same content', () => {
				const zodit = getZodit();
				zodit.value = source;
				clickButton('preview', zodit);
				const dialog = getOpenedDialog(zodit);
				expect(
					dialog.querySelector('.zodit__preview-box').innerHTML
				).eq(result);
			});
		});
	});

	describe('In iframe mode', () => {
		it('should show the same content', () => {
			const zodit = getZodit({ iframe: true });
			zodit.value =
				'<p>text</p><table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>';
			clickButton('preview', zodit);
			const dialog = getOpenedDialog(zodit);
			expect(
				dialog.querySelector('.zodit__preview-box iframe')
					.contentDocument.body.innerHTML
			).eq(
				'<p>text</p><table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>'
			);
		});

		describe('Double time', () => {
			it('should show the same content', () => {
				const zodit = getZodit({ iframe: true });
				zodit.value =
					'<p>text</p><table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>';
				clickButton('preview', zodit);
				const dialog = getOpenedDialog(zodit);
				expect(
					dialog.querySelector('.zodit__preview-box iframe')
						.contentDocument.body.innerHTML
				).eq(
					'<p>text</p><table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>'
				);

				dialog.component.close();
				clickButton('preview', zodit);
				const dialog2 = getOpenedDialog(zodit);
				expect(
					dialog2.querySelector('.zodit__preview-box iframe')
						.contentDocument.body.innerHTML
				).eq(
					'<p>text</p><table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>'
				);
			});
		});
	});
});
