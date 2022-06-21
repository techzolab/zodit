/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/tooltip
 */

import './tooltip.less';

import type { IZodit, IPoint } from 'zodit/types';
import { css } from 'zodit/core/helpers';
import { Plugin } from 'zodit/core/plugin';
import { Dom } from 'zodit/core/dom';
import { getContainer } from 'zodit/core/global';
import { autobind } from 'zodit/core/decorators';

export class tooltip extends Plugin {
	private isOpened = false;

	container!: HTMLElement;

	afterInit(zodit: IZodit): void {
		this.container = zodit.c.div('zodit-tooltip');
		getContainer(this.j, tooltip).appendChild(this.container);

		let timeout = 0;

		zodit.e
			.off('.tooltip')
			.on(
				'showTooltip.tooltip',
				(getPoint: () => IPoint, content: string) => {
					zodit.async.clearTimeout(timeout);
					this.open(getPoint, content);
				}
			)

			.on('delayShowTooltip.tooltip', this.delayOpen)

			.on('escape.tooltip', this.close)
			.on(
				'hideTooltip.tooltip change.tooltip scroll.tooltip changePlace.tooltip hidePopup.tooltip closeAllPopups.tooltip',
				() => {
					this.j.async.clearTimeout(this.delayShowTimeout);

					timeout = zodit.async.setTimeout(
						this.close,
						this.j.defaultTimeout
					);
				}
			);
	}

	private delayShowTimeout: number = 0;

	@autobind
	private delayOpen(getPoint: () => IPoint, content: string): void {
		const to = this.j.o.showTooltipDelay || this.j.defaultTimeout;

		this.j.async.clearTimeout(this.delayShowTimeout);

		this.delayShowTimeout = this.j.async.setTimeout(
			() => this.open(getPoint, content),
			{
				timeout: to,
				label: 'tooltip'
			}
		);
	}

	private open(getPoint: () => IPoint, content: string): void {
		this.container.classList.add('zodit-tooltip_visible');
		this.container.innerHTML = content;

		this.isOpened = true;
		this.setPosition(getPoint);
	}

	private setPosition(getPoint: () => IPoint): void {
		const point = getPoint();

		css(this.container, {
			left: point.x,
			top: point.y
		});
	}

	@autobind
	private close(): void {
		this.j.async.clearTimeout(this.delayShowTimeout);

		if (this.isOpened) {
			this.isOpened = false;
			this.container.classList.remove('zodit-tooltip_visible');

			css(this.container, {
				left: -5000
			});
		}
	}

	beforeDestruct(zodit: IZodit): void {
		zodit?.e.off('.tooltip');
		this.close();
		Dom.safeRemove(this.container);
	}
}
