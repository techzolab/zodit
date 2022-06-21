/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module types
 */

export type StorageValueType =
	| string
	| number
	| boolean
	| object
	| StorageValueType[];

export interface IStorage<T = StorageValueType> {
	set(key: string, value: T): IStorage<T>;
	delete(key: string): IStorage<T>;
	get<R = T>(key: string): R | void;
	exists(key: string): boolean;
	clear(): IStorage<T>;
}
