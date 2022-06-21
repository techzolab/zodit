/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/link
 */

import type { IZodit, IUIElement, IUIForm, Nullable } from 'zodit/types';
import {
	UIBlock,
	UICheckbox,
	UIForm,
	UIInput,
	UISelect
} from 'zodit/core/ui/form';
import { UIButton } from 'zodit/core/ui/button';

export const formTemplate = (editor: IZodit): IUIForm => {
	const {
		openInNewTabCheckbox,
		noFollowCheckbox,
		modeClassName,
		selectSizeClassName,
		selectMultipleClassName,
		selectOptionsClassName
	} = editor.o.link;

	return new UIForm(editor, [
		new UIBlock(editor, [
			new UIInput(editor, {
				name: 'url',
				type: 'text',
				ref: 'url_input',
				label: 'URL',
				placeholder: 'http://',
				required: true
			})
		]),
		new UIBlock(
			editor,
			[
				new UIInput(editor, {
					name: 'content',
					ref: 'content_input',
					label: 'Text'
				})
			],
			{
				ref: 'content_input_box'
			}
		),
		modeClassName
			? new UIBlock(editor, [
					((): Nullable<IUIElement> => {
						if (modeClassName === 'input') {
							return new UIInput(editor, {
								name: 'className',
								ref: 'className_input',
								label: 'Class name'
							});
						}

						if (modeClassName === 'select') {
							return new UISelect(editor, {
								name: 'className',
								ref: 'className_select',
								label: 'Class name',
								size: selectSizeClassName,
								multiple: selectMultipleClassName,
								options: selectOptionsClassName
							});
						}

						return null;
					})()
			  ])
			: null,
		openInNewTabCheckbox
			? new UICheckbox(editor, {
					name: 'target',
					ref: 'target_checkbox',
					label: 'Open in new tab'
			  })
			: null,
		noFollowCheckbox
			? new UICheckbox(editor, {
					name: 'nofollow',
					ref: 'nofollow_checkbox',
					label: 'No follow'
			  })
			: null,
		new UIBlock(
			editor,
			[
				new UIButton(editor, {
					name: 'unlink',
					variant: 'default',
					text: 'Unlink'
				}),
				new UIButton(editor, {
					name: 'insert',
					type: 'submit',
					variant: 'primary',
					text: 'Insert'
				})
			],
			{
				align: 'full'
			}
		)
	]);
};
