/**
 * Type classification functions
 *
 * @module classifiers
 */

import {hasComponentTag, hasHOCTag} from './utils.js';

export async function defaultTypeClassifier ({section}) {
	const kind = section.kind;

	// Check for HOC
	if (await hasHOCTag(section)) {
		return 'hoc';
	}

	// Check for @ui
	if (await hasComponentTag(section)) {
		return 'component';
	}

	return kind;
}
