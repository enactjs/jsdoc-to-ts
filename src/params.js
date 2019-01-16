/**
 * Functions for working with params
 * TODO: Convert to new format and make a generator
 *
 * @module params
 */

function renderParam(param, typeRenderer) {
    let {name, type} = param;
    let optional = '';
    if (type.type === 'OptionalType') {
        optional = '?';
        type = type.expression;
    }

    return `${name}${optional}: ${typeRenderer(type)}`
}

exports.renderParam = renderParam;


