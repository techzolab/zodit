/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/history
 */

import type { SnapshotType } from 'zodit/types';
import type { History } from './history';

export class Command {
	undo(): void {
		this.history.snapshot.restore(this.oldValue);
	}

	redo(): void {
		this.history.snapshot.restore(this.newValue);
	}

	constructor(
		readonly oldValue: SnapshotType,
		readonly newValue: SnapshotType,
		private readonly history: History,
		readonly tick: number
	) {}
}
