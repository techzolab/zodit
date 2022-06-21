/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/link
 */

import type { IDictionary, IZodit, IUIForm, Nullable } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import {
	attr,
	convertMediaUrlToVideoEmbed,
	isString,
	isURL,
	refs,
	stripTags
} from 'zodit/core/helpers';
import { Plugin } from 'zodit/core/plugin';
import { autobind } from 'zodit/core/decorators';
import { Dialog, UIForm } from '../../modules';

import './config';

/**
 * Process link. Insert, dblclick or remove format
 */
export class link extends Plugin {
	/** @override */
	override buttons: Plugin['buttons'] = [
		{
			name: 'link',
			group: 'insert'
		}
	];

	/** @override */
	protected override afterInit(zodit: IZodit): void {
		if (zodit.o.link.followOnDblClick) {
			zodit.e.on('dblclick.link', this.onDblClickOnLink);
		}

		if (zodit.o.link.processPastedLink) {
			zodit.e.on('processPaste.link', this.onProcessPasteLink);
		}

		zodit.e.on('generateLinkForm.link', this.generateForm);

		zodit.registerCommand('openLinkDialog', {
			exec: () => {
				const dialog = new Dialog({
					resizable: false
				});

				const htmlForm = this.generateForm(zodit.s.current(), () => {
					dialog.close();
				}) as UIForm;

				htmlForm.container.classList.add('zodit-dialog_alert');
				dialog.setContent(htmlForm);
				dialog.open();

				zodit.async.requestIdleCallback(() => {
					const { url_input } = refs(htmlForm.container);
					url_input?.focus();
				});
			},
			hotkeys: zodit.o.link.hotkeys
		});
	}

	@autobind
	private onDblClickOnLink(e: MouseEvent): void {
		if (!Dom.isTag(e.target, 'a')) {
			return;
		}

		const href = attr(e.target, 'href');

		if (href) {
			location.href = href;
			e.preventDefault();
		}
	}

	@autobind
	private onProcessPasteLink(
		ignore: ClipboardEvent,
		html: string
	): HTMLAnchorElement | void {
		const { zodit } = this;

		if (isURL(html)) {
			if (zodit.o.link.processVideoLink) {
				const embed = convertMediaUrlToVideoEmbed(html);

				if (embed !== html) {
					zodit.e.stopPropagation('processPaste');

					return zodit.createInside.fromHTML(
						embed
					) as HTMLAnchorElement;
				}
			}

			const a = zodit.createInside.element('a');

			a.setAttribute('href', html);
			a.textContent = html;

			zodit.e.stopPropagation('processPaste');

			return a;
		}
	}

	@autobind
	private generateForm(
		current: Nullable<Node>,
		close: Function
	): HTMLElement | IUIForm {
		const { zodit } = this;

		const i18n = zodit.i18n.bind(zodit),
			{
				openInNewTabCheckbox,
				noFollowCheckbox,
				formTemplate,
				formClassName,
				modeClassName
			} = zodit.o.link;

		const html = formTemplate(zodit),
			form = isString(html)
				? (zodit.c.fromHTML(html, {
						target_checkbox_box: openInNewTabCheckbox,
						nofollow_checkbox_box: noFollowCheckbox
				  }) as HTMLFormElement)
				: html,
			htmlForm = Dom.isElement(form) ? form : form.container;

		const elements = refs(htmlForm),
			{ insert, unlink, content_input_box } = elements,
			{ target_checkbox, nofollow_checkbox, url_input } =
				elements as IDictionary<HTMLInputElement>,
			currentElement = current,
			isImageContent = Dom.isImage(currentElement);

		let { content_input } = elements as IDictionary<HTMLInputElement>;

		const { className_input } = elements as IDictionary<HTMLInputElement>,
			{ className_select } = elements as IDictionary<HTMLSelectElement>;

		if (!content_input) {
			content_input = zodit.c.element('input', {
				type: 'hidden',
				ref: 'content_input'
			});
		}

		if (formClassName) {
			htmlForm.classList.add(formClassName);
		}

		if (isImageContent) {
			Dom.hide(content_input_box);
		}

		let link: false | HTMLAnchorElement;

		const getSelectionText = (): string =>
			link
				? link.innerText
				: stripTags(zodit.s.range.cloneContents(), zodit.ed);

		if (current && Dom.closest(current, 'a', zodit.editor)) {
			link = Dom.closest(current, 'a', zodit.editor) as HTMLAnchorElement;
		} else {
			link = false;
		}

		if (!isImageContent && current) {
			content_input.value = getSelectionText();
		}

		if (link) {
			url_input.value = attr(link, 'href') || '';

			if (modeClassName) {
				switch (modeClassName) {
					case 'input':
						if (className_input) {
							className_input.value = attr(link, 'class') || '';
						}
						break;

					case 'select':
						if (className_select) {
							for (
								let i = 0;
								i < className_select.selectedOptions.length;
								i++
							) {
								const option = className_select.options.item(i);

								if (option) {
									option.selected = false;
								}
							}

							const classNames = attr(link, 'class') || '';

							classNames.split(' ').forEach(className => {
								if (className) {
									for (
										let i = 0;
										i < className_select.options.length;
										i++
									) {
										const option =
											className_select.options.item(i);

										if (
											option?.value &&
											option.value === className
										) {
											option.selected = true;
										}
									}
								}
							});
						}
						break;
				}
			}

			if (openInNewTabCheckbox && target_checkbox) {
				target_checkbox.checked = attr(link, 'target') === '_blank';
			}

			if (noFollowCheckbox && nofollow_checkbox) {
				nofollow_checkbox.checked = attr(link, 'rel') === 'nofollow';
			}

			insert.textContent = i18n('Update');
		} else {
			Dom.hide(unlink);
		}

		zodit.editor.normalize();
		const snapshot = zodit.history.snapshot.make();

		if (unlink) {
			zodit.e.on(unlink, 'click', (e: MouseEvent) => {
				zodit.s.restore();
				zodit.history.snapshot.restore(snapshot);

				if (link) {
					Dom.unwrap(link);
				}

				zodit.synchronizeValues();

				close();
				e.preventDefault();
			});
		}

		const onSubmit = (): false => {
			if (!url_input.value.trim().length) {
				url_input.focus();
				url_input.classList.add('zodit_error');
				return false;
			}

			let links: HTMLAnchorElement[];

			zodit.s.restore();
			zodit.s.removeMarkers();
			zodit.editor.normalize();
			zodit.history.snapshot.restore(snapshot);

			const textWasChanged =
				getSelectionText() !== content_input.value.trim();

			const ci = zodit.createInside;

			if (!link) {
				if (!zodit.s.isCollapsed()) {
					const node = zodit.s.current();

					if (Dom.isTag(node, ['img'])) {
						links = [Dom.wrap(node, 'a', ci) as HTMLAnchorElement];
					} else {
						links = zodit.s.wrapInTag('a') as HTMLAnchorElement[];
					}
				} else {
					const a = ci.element('a');
					zodit.s.insertNode(a, false, false);
					links = [a];
				}

				links.forEach(link => zodit.s.select(link));
			} else {
				links = [link];
			}

			links.forEach(a => {
				attr(a, 'href', url_input.value);

				if (modeClassName && (className_input ?? className_select)) {
					if (modeClassName === 'input') {
						if (
							className_input.value === '' &&
							a.hasAttribute('class')
						) {
							attr(a, 'class', null);
						}

						if (className_input.value !== '') {
							attr(a, 'class', className_input.value);
						}
					} else if (modeClassName === 'select') {
						if (a.hasAttribute('class')) {
							attr(a, 'class', null);
						}

						for (
							let i = 0;
							i < className_select.selectedOptions.length;
							i++
						) {
							const className =
								className_select.selectedOptions.item(i)?.value;

							if (className) {
								a.classList.add(className);
							}
						}
					}
				}

				if (!isImageContent) {
					let newContent = a.textContent;

					if (content_input.value.trim().length) {
						if (textWasChanged) {
							newContent = content_input.value;
						}
					} else {
						newContent = url_input.value;
					}

					const content = a.textContent;

					if (newContent !== content) {
						a.textContent = newContent;
					}
				}

				if (openInNewTabCheckbox && target_checkbox) {
					attr(
						a,
						'target',
						target_checkbox.checked ? '_blank' : null
					);
				}

				if (noFollowCheckbox && nofollow_checkbox) {
					attr(
						a,
						'rel',
						nofollow_checkbox.checked ? 'nofollow' : null
					);
				}

				zodit.e.fire('applyLink', zodit, a, form);
			});

			zodit.synchronizeValues();

			close();

			return false;
		};

		if (Dom.isElement(form)) {
			zodit.e.on(form, 'submit', (event: Event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
				onSubmit();
				return false;
			});
		} else {
			form.onSubmit(onSubmit);
		}

		return form;
	}

	/** @override */
	protected override beforeDestruct(zodit: IZodit): void {
		zodit.e
			.off('generateLinkForm.link', this.generateForm)
			.off('dblclick.link', this.onDblClickOnLink)
			.off('processPaste.link', this.onProcessPasteLink);
	}
}
