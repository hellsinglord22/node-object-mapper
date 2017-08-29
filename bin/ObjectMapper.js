/* ObjectMapper
 * is a mapper that take a schema and a source, 
 * the schema consist of rules 
 * each rules is applied on the source if possible
 * check ObjectMapper.test.js for example on how each rule look like  
 **/

const _ = require('lodash');
const Notation = require('notation');

const ObjectMapper = function (schema) {

	return function (source) {

		return getSourceAfterApplyingSchema({
			source,
			schema
		});

	};
};


const getSourceAfterApplyingSchema = function ({
	source,
	schema
}) {

	const REDUCE_RESULT_INITIAL_VALUE = {};

	return _.reduce(schema, function (sourceAfterApplyingSchema, schemaRule) {

		if (shouldApplySchemaRule({
				source,
				schemaRule
			})) {
			_.assignIn(sourceAfterApplyingSchema, applySchemaRule({
				source,
				schemaRule
			}));
		}

		return sourceAfterApplyingSchema;

	}, REDUCE_RESULT_INITIAL_VALUE);

}


const shouldApplySchemaRule = function ({
	source,
	schemaRule
}) {
	const sourceNotation = new Notation(source);
	return sourceNotation.get(schemaRule.key) ? true : false;
}


const applySchemaRule = function ({
	source,
	schemaRule
}) {

	const sourceNotation = new Notation(source);
	const resultNotation = new Notation({});

	const {
		key,
		mapKeyTo,
		mapKeyValueTo
	} = schemaRule;

	const sourceKeyValue = sourceNotation.get(key);
	const result = {};

	if (mapKeyValueTo === undefined) {
		result[mapKeyTo] = _.clone(sourceKeyValue);
	} else {
		result[mapKeyTo] = mapKeyValueTo(sourceKeyValue);
	}

	return result;

}


module.exports = ObjectMapper;