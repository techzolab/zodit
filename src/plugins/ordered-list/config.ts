/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/ordered-list
 */

import { Config } from 'zodit/config';
import type { IControlType, IZodit } from 'zodit/types';
import { dataBind } from 'zodit/core/helpers/utils/data-bind';

const memoExec: IControlType<IZodit>['exec'] = (
	zodit,
	_,
	{ control }
): void => {
	const key = `button${control.command}`;

	const value = (control.args && control.args[0]) ?? dataBind(zodit, key);

	dataBind(zodit, key, value);

	zodit.execCommand(
		control.command as string,
		false,
		value === 'default' ? null : value
	);
};

Config.prototype.controls.ul = {
	command: 'insertUnorderedList',
	tags: ['ul'],
	tooltip: 'Insert Unordered List',

	list: {
		default: 'Default',
		circle: 'Circle',
		disc: 'Dot',
		square: 'Quadrate'
	},
	exec: memoExec
} as IControlType;

Config.prototype.controls.ol = {
	command: 'insertOrderedList',
	tags: ['ol'],
	tooltip: 'Insert Ordered List',

	list: {
		default: 'Default',
		'lower-alpha': 'Lower Alpha',
		'lower-greek': 'Lower Greek',
		'lower-roman': 'Lower Roman',
		'upper-alpha': 'Upper Alpha',
		'upper-roman': 'Upper Roman'
	},
	exec: memoExec
} as IControlType;
