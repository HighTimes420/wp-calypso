/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import FormField from './form-field';

const AppliesToSingleProductField = ( {
	fieldName,
	labelText,
	explanationText,
	placeholderText,
	isRequired,
	value,
	edit,
} ) => {
	return (
		<FormField
			labelText={ labelText }
			explanationText={ explanationText }
			isRequired={ isRequired }
		>
			<div>Single Product Select</div>
		</FormField>
	);
}

AppliesToSingleProductField.PropTypes = {
	fieldName: PropTypes.string.isRequired,
	labelText: PropTypes.string.isRequired,
	explanationText: PropTypes.string,
	isRequired: PropTypes.bool.isRequired,
	value: PropTypes.number,
	edit: PropTypes.func.isRequired,
}

export default AppliesToSingleProductField;

