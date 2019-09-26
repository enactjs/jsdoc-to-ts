/**
 * Functions for working with types
 * TODO: Convert to new format and make a generator
 *
 * @module types
 */

/**
 * A mapping of jsdoc type fields to TypeScript types
 */
const typeMappings = {
	Array: 'Array<any>',
	Boolean: 'boolean',
	Number: 'number',
	String: 'string',
	Object: 'object',
	RecordType: 'object'
};

const nameMappings = {
	Component: 'React.ComponentType',
	Element: 'JSX.Element',
	Node: 'React.ReactNode'
};

/**
 * Converts a jsdoc NameExpression (from the type field) to text
 *
 * @param {Object} type
 * @returns {String} The type definition
 */
function renderNameExpression (type) {
	if (type.name) {
		if (nameMappings[type.name]) {
			return nameMappings[type.name];
		}
		const importMatch = type.name.match(/(\w+?)\/(\w+)\.(\w+)/i);
		if (importMatch) {
			return type.name.replace(/[/.]/g, '_');
		} else if (typeMappings[type.name]) {
			return typeMappings[type.name];
		} else {
			return type.name.replace(/^.*[/.~]/, '');
		}
	}
}

function renderGeneric (type, templates) {
	const renderedType = renderType(type.expression);
	if (!Array.isArray(templates)) {
		return renderType;
	}

	const generics = type.applications
		.map(app => app.name)
		.filter(name => templates.includes(name));

	if (generics.length === 0) {
		// warn ...
		return renderedType;
	}

	return `${renderedType}<${generics.join(', ')}>`;
}

function renderTypeApplication (type, templates) {
	if (type.expression.type === 'NameExpression') {
		switch (type.expression.name) {
			case 'Object':
				return `{[key: ${renderType(type.applications[0])}]: ${renderType(type.applications[1])}}`;
			case 'Array':
				return `${renderType(type.applications[0])}[]`;
			default:
				return renderGeneric(type, templates);
		}
	}

	return 'any';
}

function renderUnionType (type) {
	return type.elements.map(el => renderType(el)).join(' | ');
}

function renderRecordType (type, templates) {
	if (type.fields && type.fields.length) {
		const fieldNames = type.fields.map(
			field => `${field.key}: ${renderType(field.value, templates)}`
		);
		fieldNames.push('[propName: string]: any');
		return `{${fieldNames.join(', ')}}`;
	} else {
		return 'object';
	}
}

function renderArrayType (type, templates) {
	if (type.elements && type.elements.length) {
		const entries = type.elements.map(
			element => renderType(element, templates)
		);
		return `[${entries.join(', ')}]`;
	} else {
		return 'Array';
	}
}

function renderRestType (type) {
	return `${renderType(type.expression)}[]`;
}

function renderVoid () {
	return 'void';
}

function renderLiteral (type) {
	return type.value;
}

function renderAllLiteral () {
	return 'any';
}

function renderStringLiteral (type) {
	return `'${type.value}'`;
}

/**
 * Render various type strings
 */
const typeRenderers = {
	AllLiteral: renderAllLiteral,
	ArrayType: renderArrayType,
	BooleanLiteralType: renderLiteral,
	NameExpression: renderNameExpression,
	RecordType: renderRecordType,
	RestType: renderRestType,
	StringLiteralType: renderStringLiteral,
	TypeApplication: renderTypeApplication,
	UndefinedLiteral: renderVoid,
	UnionType: renderUnionType
};
function renderType (type, templates) {
	if (!type || !typeRenderers[type.type]) {
		return 'any';
	}
	return typeRenderers[type.type](type, templates);
}

function extractTypeImports (type, imports) {
	if (type.type === 'NameExpression') {
		const importMatch = type.name.match(/(\w+?)\/(\w+)\.(\w+)/i);
		if (importMatch) {
			if (imports.isLocal(type.name)) {
				type.name = importMatch[3];
			} else {
				const alias = type.name.replace(/[/.]/g, '_');
				imports.add({
					module: importMatch[1],
					path: importMatch[2],
					name: importMatch[3],
					alias
				});
			}
		}
	}
}
exports.renderType = renderType;
exports.extractTypeImports = extractTypeImports;
