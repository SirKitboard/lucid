import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Panel');

const {
	bool,
	node,
	object,
	string,
} = React.PropTypes;

/**
 * {"categories": ["layout"]}
 *
 * Panel is used to wrap content to better organize elements in window.
 */
const Panel = createClass({
	displayName: 'Panel',

	components: {
		/**
		 * Content displayed at the top of the panel.
		 */
		Header: createClass({
			displayName: 'Panel.Header',
			propName: 'Header',
		}),
		/**
		 * Content displayed at the bottom of the panel.
		 */
		Footer: createClass({
			displayName: 'Panel.Footer',
			propName: 'Footer',
		}),
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * *Child Element* - Header contents. Only one `Header` is used.
		 */
		Header: node,
		/**
		 * *Child Element* - Footer contents. Only one `Footer` is used.
		 */
		Footer: node,
		/**
		 * Generally you should only have a single child element so the centering
		 * works correctly.
		 */
		children: node,
		/**
		 * If set to true, creates a content section with no padding.
		 */
		isGutterless: bool,
		/**
		 * Styles that are passed through to root element.
		 */
		style: object,
	},

	render: function() {
		const {
			children,
			className,
			isGutterless,
			style,
			...passThroughs,
		} = this.props;

		const headerChildProp = _.first(_.map(findTypes(this.props, Panel.Header), 'props'));
		const footerChildProp = _.first(_.map(findTypes(this.props, Panel.Footer), 'props'));

		return (
			<div
				{...omitProps(passThroughs, Panel)}
				className={cx('&', className, {
					'&-is-not-gutterless': !isGutterless,
				})}
				style={style}
			>
				{headerChildProp ? (
					<header
						{...headerChildProp}
						className={cx('&-Header', headerChildProp.className)}
					/>
				) : null}

				<section className={cx('&-content')} >
					{children}
				</section>

				{footerChildProp ? (
					<footer
						{...footerChildProp}
						className={cx('&-Footer', footerChildProp.className)}
					/>
				) : null}
			</div>
		)
	},
})

export default Panel;
