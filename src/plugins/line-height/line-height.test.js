/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

describe('LineHeight plugin test', () => {
	describe('Options', () => {
		const { css } = Zodit.modules.Helpers;

		describe('defaultLineHeight', () => {
			it('Should change default css line-height property', () => {
				const box = getBox();
				box.style.lineHeight = 2.1;
				const editor = getZodit({
					defaultLineHeight: 4
				});

				editor.value = '<p>test</p>';

				expect(css(editor.editor, 'line-height'), 4);
				expect(css(editor.editor.firstElementChild, 'line-height'), 4);
			});

			describe('Set null', () => {
				it('Should do not change default css line-height property', () => {
					const box = getBox();
					box.style.lineHeight = 2.1;
					const editor = getZodit({
						defaultLineHeight: null
					});

					editor.value = '<p>test</p>';

					expect(css(editor.editor, 'line-height'), 2.1);
					expect(
						css(editor.editor.firstElementChild, 'line-height'),
						2.1
					);
				});
			});
		});

		describe('Set own list of values', () => {
			it('Should change default list', () => {
				const zodit = getZodit({
					controls: {
						lineHeight: {
							list: Zodit.atom([1, 2, 3, 3.5])
						}
					}
				});
				clickTrigger('lineHeight', zodit);
				const list = getOpenedPopup(zodit);
				expect(list.innerText).eq('1\n2\n3\n3.5');
			});
		});
	});

	describe('Select option in list', () => {
		[
			['<p>test|</p>', 1.2, '<p style="line-height:1.2">test|</p>'],
			[
				'<p>|test</p><p>test|</p>',
				1.5,
				'<p style="line-height:1.5">|test</p><p style="line-height:1.5">test|</p>'
			],
			[
				'<h1>stop</h1><p>|test</p><p>test|</p>',
				1.5,
				'<h1>stop</h1><p style="line-height:1.5">|test</p><p style="line-height:1.5">test|</p>'
			],
			[
				'<h1>stop</h1>\n<p>|test</p>\n<p>test|</p>',
				1.5,
				'<h1>stop</h1>\n<p style="line-height:1.5">|test</p>\n<p style="line-height:1.5">test|</p>'
			],
			['<p>|te|st</p>', 1.5, '<p style="line-height:1.5">|te|st</p>'],
			[
				'<p>|test</p><p>test</p>',
				1.5,
				'<p style="line-height:1.5">|test</p><p>test</p>'
			],
			[
				'<p>|One&nbsp;<em><span style="font-family: Verdana, Geneva, sans-serif; font-size: 18px; color: rgb(204, 0, 0);">{Two.Three}</span> </em>four five six seven eight {Nine.Ten} One {Two.Three} Four Five Six Seven Eight <strong>{Nine.Ten}.|</strong></p>',
				1.5,
				'<p style="line-height:1.5">|One <em><span style="color:#CC0000;font-family:Verdana,Geneva,sans-serif;font-size:18px">{Two.Three}</span> </em>four five six seven eight {Nine.Ten} One {Two.Three} Four Five Six Seven Eight <strong>{Nine.Ten}.|</strong></p>'
			]
		].forEach(([value, lineHeight, result]) => {
			describe('For text: ' + value + ' apply: ' + lineHeight, () => {
				it(
					'Should apply this option to block and result:' + result,
					() => {
						const zodit = getZodit();
						zodit.value = value;
						setCursorToChar(zodit);

						clickTrigger('lineHeight', zodit);
						const list = getOpenedPopup(zodit);
						clickButton(
							lineHeight.toString().replace('.', '_'),
							list
						);
						replaceCursorToChar(zodit);
						expect(sortAttributes(zodit.value)).eq(result);
					}
				);
			});
		});
	});

	describe('Exec command applyLineHeight', () => {
		[
			['<p>test|</p>', 1.2, '<p style="line-height:1.2">test|</p>'],
			[
				'<p>|test</p><p>test|</p>',
				1.5,
				'<p style="line-height:1.5">|test</p><p style="line-height:1.5">test|</p>'
			]
		].forEach(([value, lineHeight, result]) => {
			describe('For text: ' + value + ' apply: ' + lineHeight, () => {
				it(
					'Should apply this command to block and result:' + result,
					() => {
						const zodit = getZodit();
						zodit.value = value;
						setCursorToChar(zodit);
						zodit.execCommand('applyLineHeight', null, lineHeight);
						replaceCursorToChar(zodit);
						expect(sortAttributes(zodit.value)).eq(result);
					}
				);
			});
		});
	});
});
