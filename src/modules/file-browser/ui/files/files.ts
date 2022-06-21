/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import './files.less';
import { UIGroup } from 'zodit/core/ui';

export class FileBrowserFiles extends UIGroup {
	override className(): string {
		return 'FilebrowserFiles';
	}
}
