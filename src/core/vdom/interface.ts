/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module core/vdom
 */

import type { HTMLTagNames, Nullable } from 'zodit/types';

export interface IVDomText {
	readonly type: 'TEXT_ELEMENT';
	readonly props: {
		nodeValue: string;
		children: [];
	};
}

export interface IVDomElement {
	readonly type: HTMLTagNames;

	readonly props: {
		children: IVDom[];
		[key: string]: any;
	};
}

export type IVDom = IVDomText | IVDomElement;

export interface IFiber {
	effectTag?: 'PLACEMENT' | 'UPDATE' | 'DELETION';
	parent?: IFiber;
	sibling?: IFiber;
	child?: IFiber;
	alternate?: IFiber;
	dom: Nullable<Node>;
	type: IVDom['type'];
	props: IVDom['props'];
}

export interface IRangeVDom {
	start: IVDom;
	startOffset: number;
	end: IVDom;
	endOffset: number;
}

export interface IVDomManipulate {
	patch(vdom: IVDom, action: (v: IVDom) => IVDom): IVDomManipulate;
	remove(vdom: IVDom): IVDomManipulate;
	append(vdom: IVDom, newVDom: IVDom): IVDomManipulate;
	prepend(vdom: IVDom, newVDom: IVDom): IVDomManipulate;
	select(vdom: IVDom, range: IRangeVDom): IVDomManipulate;
}

export interface IVDomRender {
	htmlToVDom(html: string): IVDom;
	render(vdom: IVDom, root: HTMLElement): void;
}
