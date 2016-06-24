import _ from 'lodash';
import React, { createElement } from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';

import TextField from '../TextField/TextField';
import SearchIcon from '../Icon/SearchIcon/SearchIcon';

import reducers from './SearchField.reducers';

const cx = lucidClassNames.bind('&-SearchField');

const {
	bool,
	func,
	node,
	number,
	oneOfType,
	string,
} = React.PropTypes;

/**
* {"categories": ["controls", "text"], "madeFrom": ["TextField", "SearchIcon"]}
*
* This is a container that renders panels and controls its expansion/retraction.
*/
const SearchField = createClass({
	displayName: 'SearchField',

	components: {
		TextField,
		Icon: createClass({
			displayName: 'SearchField.Icon',
			propName: 'Icon',
		}),
	},

	reducers,

	propTypes: {
		/**
		 * Fires an event every time the user types text into the TextField.
		 *
		 * Signature: `(value, { event, props }) => {}`
		 */
		onChange: func,
		/**
		 * Fires an event when the user hits "enter" from the SearchField.
		 *
		 * Signature: `(value, { event, props }) => {}`
		 */
		onSubmit: func,
		/**
		 * Set the value of the input.
		 */
		value: oneOfType([
			number,
			string,
		]),
		/**
		 * Disables the SearchField by greying it out.
		 */
		isDisabled: bool,
		/**
		 * placeholder value
		 */
		placeholder: string,
		/**
		* Appended to the component-specific class names set on the root
		* element.
		*/
		className: string,
		/**
		* Passed through to the root element.
		*/
		Icon: node,
	},

	getDefaultProps() {
		return {
		};
	},

	render() {

		const {
			props,
			props: {
				className,
				isDisabled,
				onChange,
				onSubmit,
				placeholder,
				value,
				...passThroughs,
			},
		} = this;

		const {
			Icon,
			TextField,
		} = SearchField;

		const textFieldProps = {
			isDisabled,
			onChange,
			onSubmit,
			placeholder,
			isSingleLine: true,
			value,
		};

		const defaultIcon = <SearchIcon className={cx('&-Icon', { '&-Icon-active': !_.isEmpty(value) })} />;

		const iconElement = _.first(findTypes(props, Icon));
		const iconChildren = _.get(iconElement, 'props.children');
		const icon = iconChildren ? createElement(iconChildren.type, {
			...iconChildren.props,
			className: cx('&-Icon', { '&-Icon-active': !_.isEmpty(value) }, iconChildren.props.className),
		}) : defaultIcon;

		const textFieldElement = _.first(findTypes(props, TextField)) || <TextField {...textFieldProps} />;

		return (
			<div
				{...omitProps(passThroughs, SearchField)}
				className={cx('&', className)}
			>
				{textFieldElement}
				{icon}
			</div>
		);

	},
});

export default SearchField;
