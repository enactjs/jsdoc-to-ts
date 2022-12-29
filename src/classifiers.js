/**
 * Type classification functions
 *
 * @module classifiers
 */

import {hasComponentTag, hasHOCTag} from './utils.js';

export function defaultTypeClassifier ({section}) {
	const kind = section.kind;

	// Check for HOC
	if (hasHOCTag(section)) {
		return 'hoc';
	}

	// Check for @ui
	if (hasComponentTag(section)) {
		return 'component';
	}

	return kind;
}
