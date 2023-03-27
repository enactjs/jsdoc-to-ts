/**
 * Filters for working with doclets.  Filters receive an item to
 * analyze, the parent of the item and the root element. If they return
 * `true`, the item will be processed, otherwise it will be skipped.
 *
 * @module filters
 */

export function defaultTypeFilter () {
	return true;
}
