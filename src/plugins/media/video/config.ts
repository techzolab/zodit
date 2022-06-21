/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/media/video
 */

import type { IControlType, IZodit, IUIForm } from 'zodit/types';
import { Config } from 'zodit/config';
import { TabOption, TabsWidget } from 'zodit/modules/widget';
import { convertMediaUrlToVideoEmbed } from 'zodit/core/helpers';
import { UIForm, UIInput, UITextArea, UIBlock } from 'zodit/core/ui/form';
import { Button } from 'zodit/core/ui/button';

Config.prototype.controls.video = {
	popup: (editor: IZodit, current, control, close) => {
		const formLink: IUIForm = new UIForm(editor, [
				new UIBlock(editor, [
					new UIInput(editor, {
						name: 'url',
						required: true,
						label: 'URL',
						placeholder: 'https://',
						validators: ['url']
					})
				]),
				new UIBlock(editor, [
					Button(editor, '', 'Insert', 'primary').onAction(() =>
						formLink.submit()
					)
				])
			]),
			formCode: IUIForm = new UIForm(editor, [
				new UIBlock(editor, [
					new UITextArea(editor, {
						name: 'code',
						required: true,
						label: 'Embed code'
					})
				]),
				new UIBlock(editor, [
					Button(editor, '', 'Insert', 'primary').onAction(() =>
						formCode.submit()
					)
				])
			]),
			tabs: TabOption[] = [],
			insertCode = (code: string): void => {
				editor.s.restore();
				editor.s.insertHTML(code);
				close();
			};

		editor.s.save();

		tabs.push(
			{
				icon: 'link',
				name: 'Link',
				content: formLink.container
			},
			{
				icon: 'source',
				name: 'Code',
				content: formCode.container
			}
		);

		formLink.onSubmit(data => {
			insertCode(convertMediaUrlToVideoEmbed(data.url));
		});

		formCode.onSubmit(data => {
			insertCode(data.code);
		});

		return TabsWidget(editor, tabs);
	},

	tags: ['iframe'],
	tooltip: 'Insert youtube/vimeo video'
} as IControlType;
