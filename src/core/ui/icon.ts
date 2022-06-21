/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui
 */

import type {
	CanUndef,
	IDictionary,
	IUIIconState,
	IViewBased
} from 'zodit/types';
import { css } from 'zodit/core/helpers/utils/css';

export class Icon {
	private static icons: IDictionary<string> = {};

	private static getIcon(name: string): string | undefined {
		if (/<svg/i.test(name)) {
			return name;
		}

		return (
			Icon.icons[name] ||
			Icon.icons[name.replace(/-/g, '_')] ||
			Icon.icons[name.replace(/_/g, '-')] ||
			Icon.icons[name.toLowerCase()]
		);
	}

	/**
	 * Check if icon exist in store
	 */
	static exists(name: string): boolean {
		return this.getIcon(name) !== undefined;
	}

	/**
	 * Return SVG icon
	 */
	static get(name: string, defaultValue: string = '<span></span>'): string {
		return this.getIcon(name) || defaultValue;
	}

	/**
	 * Set SVG in store
	 */
	static set(name: string, value: string): typeof Icon {
		this.icons[name.replace('_', '-')] = value;
		return this;
	}

	/**
	 * Make icon html element
	 */
	static makeIcon(zodit: IViewBased, icon: IUIIconState): CanUndef<Node> {
		let iconElement: CanUndef<HTMLElement>;

		if (icon) {
			const clearName = icon.name.replace(/[^a-zA-Z0-9]/g, '_');

			if (icon.iconURL) {
				iconElement = zodit.c.span();

				css(
					iconElement,
					'backgroundImage',
					'url(' +
						icon.iconURL.replace(
							'{basePath}',
							zodit?.basePath || ''
						) +
						')'
				);
			} else {
				const svg =
					zodit.e.fire('getIcon', icon.name, icon, clearName) ||
					Icon.get(icon.name, '') ||
					zodit.o.extraIcons?.[icon.name];

				if (svg) {
					iconElement = zodit.c.fromHTML(svg.trim());

					if (!/^<svg/i.test(icon.name)) {
						iconElement.classList.add('zodit-icon_' + clearName);
					}
				}
			}
		}

		if (iconElement) {
			iconElement.classList.add('zodit-icon');
			iconElement.style.fill = icon.fill;
		}

		return iconElement;
	}
}
