/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module types
 */

import type { IZodit } from './zodit';
import type { CanPromise, IDestructible, IInitable } from './types';
import type { IViewBased } from './view';
import type { ButtonGroup, IControlType } from './toolbar';

export interface IPluginButton {
	name: string;
	group?: ButtonGroup;
	position?: number;
	options?: IControlType;
}

export class IPlugin<T extends IViewBased = IViewBased>
	implements IDestructible, IInitable
{
	static requires?: string[];
	requires?: string[];

	hasStyle?: boolean;

	/**
	 * Plugin buttons
	 */
	buttons?: IPluginButton[];

	init(zodit: T): void;
	destruct(zodit?: T): void;

	constructor(zodit?: T);
}

interface PluginFunction {
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	constructor(zodit: IViewBased): void;
}

export type PluginType = typeof IPlugin | IPlugin | PluginFunction;
export type PluginInstance = IPlugin | object;

export interface IExtraPlugin {
	name: string;
	url?: string;
}

export interface IPluginSystem {
	add(name: string, plugin: any): void;
	get(name: string): PluginType | void;
	remove(name: string): void;
	init(zodit: IZodit): CanPromise<void>;
}
