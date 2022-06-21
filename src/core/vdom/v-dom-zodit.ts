/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import './v-dom-zodit.less';

import type { IVDom } from './interface';
import { VDomRender } from './render';

export class VDomZodit {
	private container: HTMLElement;

	private vdom!: IVDom;

	private render: VDomRender = new VDomRender();

	set value(v: string) {
		this.vdom = this.render.htmlToVDom(v);
		this.render.render(this.vdom, this.container);
	}

	private constructor(elm: HTMLInputElement) {
		this.container = document.createElement('div');
		elm.style.display = 'none';
		elm.parentElement?.insertBefore(this.container, elm);
		this.container.setAttribute('contenteditable', 'true');
		this.container.classList.add('zodit-v-dom-container');
		this.value = elm.value;

		this.preventAllInputEvents();
	}

	static make(elm: HTMLInputElement): VDomZodit {
		return new VDomZodit(elm);
	}

	private preventAllInputEvents(): void {
		this.container.addEventListener('keydown', e => {
			e.preventDefault();
		});
	}
}
