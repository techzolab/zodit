/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui/form/inputs
 */

import './select.less';

import type { IUISelect, IViewBased } from 'zodit/types';
import { attr } from 'zodit/core/helpers/utils/utils';
import { component } from 'zodit/core/decorators/component/component';
import { UIInput } from 'zodit/core/ui/form/inputs/input/input';
import {
	inputValidators,
	selectValidators
} from 'zodit/core/ui/form/validators';

@component
export class UISelect extends UIInput implements IUISelect {
	/** @override */
	override className(): string {
		return 'UISelect';
	}

	/** @override */
	override nativeInput!: IUISelect['nativeInput'];

	/** @override */
	static override defaultState: IUISelect['state'] = {
		...UIInput.defaultState,
		options: [],
		size: 1,
		multiple: false
	};

	/** @override */
	override state: IUISelect['state'] = { ...UISelect.defaultState };

	/** @override **/
	protected override createContainer(
		state: Partial<IUISelect['state']>
	): HTMLElement {
		const container = super.createContainer(state);

		const { j } = this,
			{ nativeInput } = this;

		const opt = (): HTMLOptionElement => j.create.element('option');

		if (state.placeholder !== undefined) {
			const option = opt();
			option.value = '';
			option.text = j.i18n(state.placeholder);
			nativeInput.add(option);
		}

		state.options?.forEach(element => {
			const option = opt();
			option.value = element.value.toString();
			option.text = j.i18n(element.text);
			nativeInput.add(option);
		});

		if (state.size && state.size > 0) {
			attr(nativeInput, 'size', state.size);
		}

		if (state.multiple) {
			attr(nativeInput, 'multiple', '');
		}

		return container;
	}

	/** @override **/
	protected override createNativeInput(): IUISelect['nativeInput'] {
		return this.j.create.element('select');
	}

	/** @override **/
	protected override updateValidators(): void {
		super.updateValidators();

		if (this.state.required) {
			this.validators.delete(inputValidators.required);
			this.validators.add(selectValidators.required);
		}
	}

	constructor(zodit: IViewBased, state: Partial<IUISelect['state']>) {
		super(zodit, state);
		Object.assign(this.state, state);
	}
}
