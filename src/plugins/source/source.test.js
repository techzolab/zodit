/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */
describe('Source code test', function () {
	describe('Init', function () {
		it('After init container must has source editor container', function (done) {
			unmockPromise();

			let timeout;
			const area = appendTestArea(false, true),
				__done = function () {
					clearTimeout(timeout);
					this.events.off('beforeDestruct');
					this.destruct();
					area.parentNode.removeChild(area);
					done();
				};

			let editor;

			timeout = setTimeout(function () {
				expect(false).is.true;
				__done.call(editor);
			}, 5000);

			editor = getZodit(
				{
					defaultMode: Zodit.MODE_SOURCE,
					sourceEditor: 'ace',
					events: {
						beforeDestruct: function () {
							return false;
						},
						sourceEditorReady: function (editor) {
							expect(
								editor.container.querySelectorAll(
									'.zodit-source__mirror-fake'
								).length
							).equals(1);
							__done.call(editor);
						}
					}
				},
				area
			);
		}).timeout(6000);

		describe('Set value in source mode', function () {
			it('Should set value in editor and in source', function (done) {
				unmockPromise();

				let timeout;
				const area = appendTestArea(false, true),
					__done = function () {
						clearTimeout(timeout);
						this.events.off('beforeDestruct');
						this.destruct();
						area.parentNode.removeChild(area);
						done();
					};

				let editor;

				timeout = setTimeout(function () {
					expect(false).is.true;
					__done.call(editor);
				}, 5000);

				editor = getZodit(
					{
						defaultMode: Zodit.MODE_SOURCE,
						sourceEditor: 'ace',
						events: {
							beforeDestruct: function () {
								return false;
							},
							sourceEditorReady: function (editor) {
								setTimeout(() => {
									expect(
										editor.__plugins.source.sourceEditor.getValue()
									).equals('<p>pop</p>');
									editor.value = '<p>test</p>';
									expect(
										editor.__plugins.source.sourceEditor.getValue()
									).equals('<p>test</p>');
									__done.call(editor);
								}, 300);
							}
						}
					},
					area
				);

				editor.value = '<p>pop</p>';
			}).timeout(6000);
		});

		describe('Split mode', function () {
			it('Should shoe source and wysiwyg in same time', function () {
				const editor = getZodit({
					defaultMode: Zodit.MODE_SPLIT,
					sourceEditor: 'area'
				});

				expect(
					editor.ew.getComputedStyle(editor.editor).display
				).equals('block');
				expect(
					editor.ew.getComputedStyle(
						editor.container.querySelector('.zodit-source')
					).display
				).equals('block');
			}).timeout(6000);
		});
	});

	describe('Change mode', function () {
		describe('In WYSIWYG mode isEditorMode', function () {
			it('Should return true', function () {
				const editor = getZodit();
				expect(editor.isEditorMode()).is.true;
				editor.toggleMode();
				expect(editor.isEditorMode()).is.false;
			});
		});

		it('Should not fire Change event', function () {
			const editor = getZodit({
				useAceEditor: false // because onChange can be fired after aceInited
			});

			const defaultValue = '<p>test</p>';
			let count = 0;

			editor.value = defaultValue;

			editor.events.on('change', function (value, oldvalue) {
				expect(oldvalue).does.not.equal(value);
				expect(defaultValue).does.not.equal(value);
				count++;
			});

			editor.s.setCursorAfter(editor.editor.firstChild.firstChild);
			editor.setMode(Zodit.MODE_SOURCE);
			editor.setMode(Zodit.MODE_WYSIWYG);
			editor.value = defaultValue;
			editor.value = '<p>another</p>';

			expect(1).equals(count);
		});

		describe('After change mode to source mode and use insertHTML method', function () {
			it('Should insert text on caret position', function (done) {
				unmockPromise();

				getZodit({
					sourceEditor: 'ace',
					beautifyHTML: false,
					events: {
						sourceEditorReady: function (zodit) {
							zodit.s.focus();
							zodit.value = '<p>test <span>test</span> test</p>';
							const range = zodit.ed.createRange();

							range.selectNodeContents(
								zodit.editor.querySelector('span')
							);
							range.collapse(false);

							zodit.s.selectRange(range);

							zodit.setMode(Zodit.MODE_SOURCE);

							zodit.s.insertHTML('loop');

							expect(zodit.value).equals(
								'<p>test <span>testloop</span> test</p>'
							);
							mockPromise();

							done();
						}
					}
				});
			}).timeout(4000);

			describe('Without ace', function () {
				it('Should insert text on caret position', function () {
					const editor = getZodit({
						useAceEditor: false
					});

					editor.value = '<p>one <span>two</span> three</p>';
					const range = editor.s.createRange();
					range.selectNodeContents(
						editor.editor.querySelector('span')
					);
					range.collapse(false);
					editor.s.selectRange(range);

					editor.s.insertHTML('stop');
					expect(editor.value).equals(
						'<p>one <span>twostop</span> three</p>'
					);

					editor.setMode(Zodit.MODE_SOURCE);

					editor.s.insertHTML('loop');
					expect(editor.value).equals(
						'<p>one <span>twostoploop</span> three</p>'
					);
				});
			});
		});
	});
});
