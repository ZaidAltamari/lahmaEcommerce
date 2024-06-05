import React from 'react';
import Select from 'react-select';
const MultiSelectDropdown = ({ options, onChange, value }) => {
	const selectedOptions = options.filter((option) =>
		(value || []).includes(option.value),
	);
	return (
		<Select
			options={options}
			onChange={onChange}
			value={selectedOptions}
			menuPlacement='top'
			isMulti
		/>
	);
};
export default MultiSelectDropdown;
