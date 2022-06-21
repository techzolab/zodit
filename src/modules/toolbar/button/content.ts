/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/toolbar/button
 */

import './content.less';

import type {
	IControlTypeContent,
	IToolbarButton,
	IViewBased,
	Nullable
} from 'zodit/types';
import { UIButton } from 'zodit/core/ui/button';
import { Dom } from 'zodit/core/dom';
import { isString, attr } from 'zodit/core/helpers';
import { component } from 'zodit/core/decorators';

@component
export class ToolbarContent<T extends IViewBased = IViewBased>
	extends UIButton
	implements IToolbarButton
{
	/** @override */
	override className(): string {
		return 'ToolbarContent';
	}

	/** @override */
	override update(): void {
		const content = this.control.getContent(this.j, this.control, this);

		if (isString(content) || content.parentNode !== this.container) {
			Dom.detach(this.container);

			this.container.appendChild(
				isString(content) ? this.j.create.fromHTML(content) : content
			);
		}

		super.update();
	}

	/** @override */
	protected override createContainer(): HTMLElement {
		return this.j.c.span(this.componentName);
	}

	constructor(
		zodit: T,
		readonly control: IControlTypeContent,
		readonly target: Nullable<HTMLElement> = null
	) {
		super(zodit);

		this.container.classList.add(
			`${this.componentName}_${this.clearName(control.name)}`
		);

		attr(this.container, 'role', 'content');
	}
}
