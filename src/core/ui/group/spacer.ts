/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui/group
 */

import { UIElement } from 'zodit/core/ui/element';
import { component } from 'zodit/core/decorators/component/component';

@component
export class UISpacer extends UIElement {
	override className(): string {
		return 'UISpacer';
	}
}
