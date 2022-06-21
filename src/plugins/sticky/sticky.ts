/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/sticky
 */

import './sticky.less';

import type { IBound, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';
import { IS_IE, MODE_WYSIWYG } from 'zodit/core/constants';
import { Plugin, Dom } from '../../modules';
import { css, offset } from 'zodit/core/helpers';
import { throttle } from 'zodit/core/decorators';

declare module 'zodit/config' {
	interface Config {
		/**
		 * @example
		 * ```javascript
		 * var editor = Zodit.make('#someid', {
		 *  toolbarSticky: false
		 * })
		 * ```
		 */
		toolbarSticky: boolean;

		toolbarDisableStickyForMobile: boolean;

		/**
		 * For example, in Joomla, the top menu bar closes Zodit toolbar when scrolling. Therefore, it is necessary to
		 * move the toolbar Zodit by this amount [more](http://techzolab.net/opensource/zodit/doc/#2.5.57)
		 *
		 * @example
		 * ```javascript
		 * var editor = Zodit.make('#someid', {
		 *  toolbarStickyOffset: 100
		 * })
		 * ```
		 */
		toolbarStickyOffset: number;
	}
}

Config.prototype.toolbarSticky = true;
Config.prototype.toolbarDisableStickyForMobile = true;
Config.prototype.toolbarStickyOffset = 0;

export class sticky extends Plugin {
	private isToolbarSticked: boolean = false;
	private dummyBox?: HTMLElement;

	private createDummy = (toolbar: HTMLElement): void => {
		if (!isESNext && IS_IE && !this.dummyBox) {
			this.dummyBox = this.j.c.div();
			this.dummyBox.classList.add('zodit_sticky-dummy_toolbar');
			this.j.container.insertBefore(this.dummyBox, toolbar);
		}
	};

	/**
	 * Add sticky
	 */
	addSticky = (toolbar: HTMLElement): void => {
		if (!this.isToolbarSticked) {
			this.createDummy(toolbar);
			this.j.container.classList.add('zodit_sticky');

			this.isToolbarSticked = true;
		}

		// on resize it should work always
		css(toolbar, {
			top: this.j.o.toolbarStickyOffset || null,
			width: this.j.container.offsetWidth - 2
		});

		if (!isESNext && IS_IE && this.dummyBox) {
			css(this.dummyBox, {
				height: toolbar.offsetHeight
			});
		}
	};

	/**
	 * Remove sticky behaviour
	 */
	removeSticky = (toolbar: HTMLElement): void => {
		if (this.isToolbarSticked) {
			css(toolbar, {
				width: '',
				top: ''
			});

			this.j.container.classList.remove('zodit_sticky');
			this.isToolbarSticked = false;
		}
	};

	afterInit(zodit: IZodit): void {
		zodit.e
			.on(
				zodit.ow,
				'scroll.sticky wheel.sticky mousewheel.sticky resize.sticky',
				this.onScroll
			)
			.on('getStickyState.sticky', () => this.isToolbarSticked);
	}

	/**
	 * Scroll handler
	 */
	@throttle()
	private onScroll(): void {
		const { zodit } = this;

		const scrollWindowTop: number =
				zodit.ow.pageYOffset ||
				(zodit.od.documentElement &&
					zodit.od.documentElement.scrollTop) ||
				0,
			offsetEditor: IBound = offset(
				zodit.container,
				zodit,
				zodit.od,
				true
			),
			doSticky: boolean =
				zodit.getMode() === MODE_WYSIWYG &&
				scrollWindowTop + zodit.o.toolbarStickyOffset >
					offsetEditor.top &&
				scrollWindowTop + zodit.o.toolbarStickyOffset <
					offsetEditor.top + offsetEditor.height &&
				!(zodit.o.toolbarDisableStickyForMobile && this.isMobile());

		if (
			zodit.o.toolbarSticky &&
			zodit.o.toolbar === true &&
			this.isToolbarSticked !== doSticky
		) {
			const container = zodit.toolbarContainer;

			if (container) {
				doSticky
					? this.addSticky(container)
					: this.removeSticky(container);
			}

			zodit.e.fire('toggleSticky', doSticky);
		}
	}

	/**
	 * Is mobile device
	 */
	private isMobile(): boolean {
		return (
			this.j &&
			this.j.options &&
			this.j.container &&
			this.j.o.sizeSM >= this.j.container.offsetWidth
		);
	}

	/** @override */
	beforeDestruct(zodit: IZodit): void {
		this.dummyBox && Dom.safeRemove(this.dummyBox);
		zodit.e
			.off(
				zodit.ow,
				'scroll.sticky wheel.sticky mousewheel.sticky resize.sticky',
				this.onScroll
			)
			.off('.sticky');
	}
}
