/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

describe('Tab test', () => {
	describe('Inside LI', () => {
		[
			[
				'<ul><li>test</li><li>|test</li></ul>',
				'<ul><li>test<ul><li>|test</li></ul></li></ul>'
			],
			[
				'<ol><li>test<ul><li>test</li><li>|test</li></ul></li></ol>',
				'<ol><li>test<ul><li>test<ul><li>|test</li></ul></li></ul></li></ol>'
			],
			[
				'<ul><li>test</li><li>test|</li></ul>',
				'<ul><li>test</li><li>test|</li></ul>'
			],
			[
				'<ul><li>|test</li><li>test|</li></ul>',
				'<ul><li>|test</li><li>test|</li></ul>'
			],
			[
				'<ol><li>test</li><li>|test</li></ol>',
				'<ol><li>test<ol><li>|test</li></ol></li></ol>'
			],
			[
				'<ol><li>|test</li><li>test</li></ol>',
				'<ol><li>|test</li><li>test</li></ol>'
			]
		].forEach(([key, result]) => {
			describe('For key ' + key + ' tab', () => {
				it('Should be result ' + result, () => {
					const editor = getZodit();
					editor.value = key;
					setCursorToChar(editor);
					simulateEvent('keydown', 'Tab', editor.editor);
					replaceCursorToChar(editor);
					expect(sortAttributes(editor.value)).eq(result);
				});
			});
		});

		describe('Disable tabInsideLiInsertNewList', () => {
			it('Should not create new list', () => {
				const editor = getZodit({
					tab: {
						tabInsideLiInsertNewList: false
					}
				});
				editor.value = '<ul><li>test</li><li>|test</li></ul>';
				setCursorToChar(editor);
				simulateEvent('keydown', 'Tab', editor.editor);
				replaceCursorToChar(editor);
				expect(sortAttributes(editor.value)).eq(
					'<ul><li>test</li><li>|test</li></ul>'
				);
			});
		});
	});
});
