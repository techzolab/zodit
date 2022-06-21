/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */
describe('Test states', function () {
	describe('ReadOnly', function () {
		describe('Set readonly mode in options', function () {
			describe('Readonly', function () {
				it('Should deny edit content in simple source editor', function () {
					const editor = getZodit({
						readonly: true,
						sourceEditor: 'area'
					});
					editor.setMode(Zodit.MODE_SOURCE);
					expect(true).equals(
						editor.__plugins.source.sourceEditor.instance.hasAttribute(
							'readonly'
						)
					);
				});
			});

			describe('For iframe', function () {
				it("Should deny edit content in iframe's body", function (done) {
					unmockPromise();

					getZodit({
						readonly: true,
						iframe: true,
						events: {
							afterConstructor: function (zodit) {
								expect(false).equals(
									zodit.editor.hasAttribute('contenteditable')
								);
								expect('BODY').equals(zodit.editor.nodeName);
								done();
							}
						}
					});
				});
			});

			it('Should deny edit content in wysiwyg', function () {
				const editor = getZodit({
					readonly: true
				});
				expect(false).equals(
					editor.editor.hasAttribute('contenteditable')
				);
			});

			it('Should deny exec any commands', function () {
				const editor = getZodit({
					readonly: true
				});

				editor.value = 'test';

				editor.s.select(editor.editor.firstChild);

				editor.execCommand('bold');

				expect(editor.value).equals('<p>test</p>');
			});

			it('Should disable all toolbar buttons besides source, print, about, fullsize', function () {
				const editor = getZodit({
					readonly: true,
					toolbarAdaptive: false,
					history: {
						timeout: 0
					}
				});

				editor.value = 'test';
				const buttons = [].slice.call(
					editor.container.querySelectorAll('.zodit-toolbar-button')
				);

				expect(buttons.length).is.above(0);

				buttons.forEach(function (btn) {
					if (
						!/(source|print|about|fullsize|separator|selectall|break)/.test(
							btn.className
						)
					) {
						expect(btn.hasAttribute('disabled')).is.true;
					}
				});
			});

			describe('Readonly for ACE', function () {
				it('Should deny edit content in ace source editor', function (done) {
					unmockPromise();

					const editor = getZodit({
						readonly: true,
						sourceEditor: 'ace',
						events: {
							sourceEditorReady: function (editor) {
								expect(null).is.not.equal(
									editor.__plugins.source.sourceEditor
										.instance
								);
								expect(true).equals(
									editor.__plugins.source.sourceEditor.instance.getReadOnly()
								);
								mockPromise();

								done();
							}
						}
					});

					editor.setMode(Zodit.MODE_SOURCE);
				}).timeout(6000);
			});

			describe('Search plugin', function () {
				describe('CTRL + H', function () {
					describe('In readonly editor', function () {
						it('Should be deny', function () {
							const editor = getZodit({
								readonly: true,
								history: {
									timeout: 0
								}
							});

							simulateEvent(
								'keydown',
								Zodit.KEY_H,
								editor.editor,
								function (options) {
									options.ctrlKey = true;
								}
							);

							const search =
								editor.container.querySelector('.zodit-search');

							expect(search).is.null;
						});
					});
				});
			});

			describe('Method get read only', function () {
				it('Should return enable/disable readonly', function () {
					const editor = getZodit({
						readonly: true
					});

					expect(true).equals(editor.getReadOnly());
					editor.setReadOnly(false);
					expect(false).equals(editor.getReadOnly());
					editor.destruct();

					const editor2 = getZodit();
					expect(false).equals(editor2.getReadOnly());
				});
			});
		});

		describe('Set readonly mode by source element attribute', function () {
			it('Should work like by options', function () {
				const area = appendTestArea();

				area.setAttribute('readonly', 'true');

				const editor = Zodit.make(area);

				expect(editor.editor.hasAttribute('contenteditable')).is.false;
				expect(editor.getReadOnly()).is.true;
			});

			describe('In short form', function () {
				it('Should work like by options', function () {
					const area = appendTestArea();

					area.setAttribute('readonly', '');

					const editor = Zodit.make(area);

					expect(editor.editor.hasAttribute('contenteditable')).is
						.false;
					expect(editor.getReadOnly()).is.true;
				});
			});
		});

		describe('Disable readonly mode', function () {
			it('Should allow edit content in wysiwyg', function () {
				const editor = getZodit({
					readonly: true
				});
				expect(false).equals(
					editor.editor.hasAttribute('contenteditable')
				);
				editor.setReadOnly(false);
				expect(true).equals(
					editor.editor.hasAttribute('contenteditable')
				);
			});

			it('Should allow edit content in simple source editor', function () {
				const editor = getZodit({
					readonly: true,
					sourceEditor: 'area'
				});

				editor.setMode(Zodit.MODE_SOURCE);
				expect(true).equals(
					editor.__plugins.source.sourceEditor.instance.hasAttribute(
						'readonly'
					)
				);

				editor.setReadOnly(false);

				expect(false).equals(
					editor.__plugins.source.sourceEditor.instance.hasAttribute(
						'readonly'
					)
				);
			});

			it('Should allow edit content in ace source editor', function (done) {
				unmockPromise();

				const editor = getZodit({
					readonly: true,
					sourceEditor: 'ace',
					defaultMode: Zodit.MODE_SOURCE,
					events: {
						sourceEditorReady: function (editor) {
							expect(null).does.not.equal(
								editor.__plugins.source.sourceEditor.instance
							);
							expect(true).equals(
								editor.__plugins.source.sourceEditor.instance.getReadOnly()
							);

							editor.setReadOnly(false);
							expect(false).equals(
								editor.__plugins.source.sourceEditor.instance.getReadOnly()
							);

							mockPromise();

							done();
						}
					}
				});

				editor.setMode(Zodit.MODE_SOURCE);
			}).timeout(6000);
		});
	});

	describe('Disabled', function () {
		describe('Set disabled mode in options', function () {
			it("Should enable readonly mode too and editor's container should have zodit_disabled class", function () {
				const area = appendTestArea();

				area.setAttribute('disabled', 'true');

				const editor = Zodit.make(area);

				expect(editor.container.classList.contains('zodit_disabled')).is
					.true;
				expect(editor.editor.hasAttribute('contenteditable')).is.false;
				expect(editor.getReadOnly()).is.true;
				expect(editor.getDisabled()).is.true;
			});
		});
		describe('Switch disabled mode', function () {
			it('Should enable readonly if true but set default readonly mode in false', function () {
				const area = appendTestArea();

				area.setAttribute('disabled', 'true');
				area.setAttribute('readonly', 'true');

				const editor = Zodit.make(area);

				expect(editor.getReadOnly()).is.true;
				expect(editor.getDisabled()).is.true;

				editor.setDisabled(false);

				expect(editor.getReadOnly()).is.true;
				expect(editor.getDisabled()).is.false;
			});
		});
	});
});
