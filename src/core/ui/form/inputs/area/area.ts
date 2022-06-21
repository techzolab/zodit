/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui/form/inputs
 */

import './area.less';

import type { IUITextArea, IViewBased } from 'zodit/types';
import { UIInput } from 'zodit/core/ui/form/inputs/input/input';
import { component } from 'zodit/core/decorators/component/component';

@component
export class UITextArea extends UIInput implements IUITextArea {
	/** @override */
	override className(): string {
		return 'UITextArea';
	}

	/** @override */
	static override defaultState: IUITextArea['state'] = {
		...UIInput.defaultState,
		size: 5,
		resizable: true
	};

	override nativeInput!: HTMLTextAreaElement;

	/** @override */
	override state: IUITextArea['state'] = { ...UITextArea.defaultState };

	/** @override */
	protected override createContainer(options: this['state']): HTMLElement {
		this.nativeInput = this.j.create.element('textarea');

		return super.createContainer(options);
	}

	constructor(zodit: IViewBased, state: Partial<IUITextArea['state']>) {
		super(zodit, state);
		Object.assign(this.state, state);

		if (this.state.resizable === false) {
			this.nativeInput.style.resize = 'none';
		}
	}
}
