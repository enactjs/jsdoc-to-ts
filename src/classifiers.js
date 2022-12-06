/**
 * Type classification functions
 *
 * @module classifiers
 */

import {hasComponentTag, hasHOCTag} from './utils.js'//const {hasComponentTag, hasHOCTag} = require('./utils');

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
// exports.defaultTypeClassifier = defaultTypeClassifier;
