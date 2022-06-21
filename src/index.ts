/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:README.md]]
 * @packageDocumentation
 * @module zodit
 */

import './styles';

declare function require(moduleName: string): any;

if (process.env.TARGET_ES !== 'es2018' && typeof window !== 'undefined') {
	require('./polyfills');
}

import { Zodit as DefaultZodit } from './zodit';

import Languages from './langs/';

import * as decorators from './core/decorators';
import * as constants from './core/constants';
import * as Modules from './modules/';
import * as Plugins from './plugins/';
import * as Icons from './styles/icons/';

// copy constants in Zodit
Object.keys(constants).forEach((key: string) => {
	(DefaultZodit as any)[key] = (constants as any)[key];
});

const esFilter = (key: string): boolean => key !== '__esModule';

// Icons
Object.keys(Icons)
	.filter(esFilter)
	.forEach((key: string) => {
		Modules.Icon.set(key.replace('_', '-'), (Icons as any)[key]);
	});

// Modules
Object.keys(Modules)
	.filter(esFilter)
	.forEach((key: string) => {
		DefaultZodit.modules[key] = (Modules as any)[key];
	});

// Decorators
Object.keys(decorators)
	.filter(esFilter)
	.forEach((key: string) => {
		DefaultZodit.decorators[key] = (decorators as any)[key];
	});

['Confirm', 'Alert', 'Prompt'].forEach((key: string) => {
	(DefaultZodit as any)[key] = (Modules as any)[key];
});

// Plugins
Object.keys(Plugins)
	.filter(esFilter)
	.forEach((key: string) => {
		DefaultZodit.plugins.add(key, (Plugins as any)[key]);
	});

// Languages
Object.keys(Languages)
	.filter(esFilter)
	.forEach((key: string) => {
		DefaultZodit.lang[key] = (Languages as any)[key];
	});

export { DefaultZodit as Zodit };
