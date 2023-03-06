/**
 * Type classification functions
 *
 * @module classifiers
 */

const {hasComponentTag, hasHOCTag} = require('./utils');

async function defaultTypeClassifier ({section}) {
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
exports.defaultTypeClassifier = defaultTypeClassifier;
