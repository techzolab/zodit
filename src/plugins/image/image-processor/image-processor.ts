/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:plugins/image/image-processor/README.md]]
 * @packageDocumentation
 * @module plugins/image-processor
 */

import type { IDictionary, IZodit } from 'zodit/types';
import { $$, dataBind } from 'zodit/core/helpers';
import { Plugin } from 'zodit/core/plugin';
import { debounce, watch } from 'zodit/core/decorators';

import './config';
import { SOURCE_CONSUMER } from 'zodit/plugins/source/const';

const JODIT_IMAGE_PROCESSOR_BINDED = '__zodit_imageprocessor_binded';
const JODIT_IMAGE_BLOB_ID = JODIT_IMAGE_PROCESSOR_BINDED + 'blob-id';

/**
 * Change editor's size after load all images
 */
export class imageProcessor extends Plugin {
	protected afterInit(zodit: IZodit): void {}

	protected beforeDestruct(zodit: IZodit): void {
		const list = zodit.buffer.get<IDictionary>(JODIT_IMAGE_BLOB_ID);

		if (list) {
			const keys = Object.keys(list);

			for (const uri of keys) {
				URL.revokeObjectURL(uri);
			}

			zodit.buffer.delete(JODIT_IMAGE_BLOB_ID);
		}
	}

	@watch(':afterGetValueFromEditor')
	protected onAfterGetValueFromEditor(
		data: { value: string },
		consumer?: string
	): void {
		if (consumer !== SOURCE_CONSUMER) {
			return this.onBeforeSetElementValue(data);
		}
	}

	@watch(':beforeSetElementValue')
	protected onBeforeSetElementValue(data: { value: string }): void {
		const { zodit: editor } = this;

		if (!editor.o.imageProcessor.replaceDataURIToBlobIdInView) {
			return;
		}

		const list = editor.buffer.get<IDictionary>(JODIT_IMAGE_BLOB_ID);

		if (list) {
			const keys = Object.keys(list);

			for (const uri of keys) {
				while (data.value.includes(uri)) {
					data.value = data.value.replace(uri, list[uri]);
				}
			}
		}
	}

	@watch([':change', ':afterInit', ':changePlace'])
	@debounce()
	protected async afterChange(data: { value: string }): Promise<void> {
		const { zodit: editor } = this;

		if (!editor.editor) {
			return;
		}

		$$('img', editor.editor).forEach(elm => {
			if (!dataBind(elm, JODIT_IMAGE_PROCESSOR_BINDED)) {
				dataBind(elm, JODIT_IMAGE_PROCESSOR_BINDED, true);

				if (!elm.complete) {
					editor.e.on(elm, 'load', function ElementOnLoad() {
						!editor.isInDestruct && editor.e?.fire('resize');

						editor.e.off(elm, 'load', ElementOnLoad);
					});
				}

				if (elm.src && /^data:/.test(elm.src)) {
					replaceDataURIToBlobUUID(editor, elm);
				}

				editor.e.on(elm, 'mousedown touchstart', () => {
					editor.s.select(elm);
				});
			}
		});
	}
}

function replaceDataURIToBlobUUID(editor: IZodit, elm: HTMLImageElement): void {
	if (!editor.o.imageProcessor.replaceDataURIToBlobIdInView) {
		return;
	}

	if (typeof ArrayBuffer === 'undefined' || typeof URL === 'undefined') {
		return;
	}

	const dataUri = elm.src,
		blob = dataURItoBlob(dataUri);

	elm.src = URL.createObjectURL(blob);
	editor.e.fire('internalUpdate');

	const { buffer } = editor;

	const list: IDictionary =
		buffer.get<IDictionary>(JODIT_IMAGE_BLOB_ID) || {};

	list[elm.src] = dataUri;

	editor.buffer.set(JODIT_IMAGE_BLOB_ID, list);
}

// https://stackoverflow.com/a/12300351
function dataURItoBlob(dataURI: string): Blob {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	const byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to an ArrayBuffer
	const ab = new ArrayBuffer(byteString.length);

	// create a view into the buffer
	const ia = new Uint8Array(ab);

	// set the bytes of the buffer to the correct values
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	return new Blob([ab], { type: mimeString });
}
