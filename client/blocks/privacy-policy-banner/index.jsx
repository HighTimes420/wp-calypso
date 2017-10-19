/**
 * External dependencies
 *
 * @format
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { getPreference, isFetchingPreferences } from 'state/preferences/selectors';
import { savePreference } from 'state/preferences/actions';
import { identity } from 'lodash';
import ExternalLink from 'components/external-link';
import Banner from 'components/banner';
import PrivacyPolicyDialog from './privacy-policy-dialog';
import QueryPrivacyPolicy from 'components/data/query-privacy-policy';
import { getPrivacyPolicyByEntity } from 'state/selectors';
import { AUTOMATTIC_ENTITY, PRIVACY_POLICY_PREFERENCE } from './constants';

class PrivacyPolicyBanner extends Component {
	static propTypes = {
		isPolicyAlreadyAccepted: PropTypes.bool,
		privacyPolicy: PropTypes.object,
		privacyPolicyId: PropTypes.string,
		text: PropTypes.string,
		translate: PropTypes.func,
	};

	static defaultProps = {
		privacyPolicy: {},
		text: '',
		translate: identity,
	};

	state = {
		showDialog: false,
	};

	acceptUpdates = () => {
		if ( ! this.props.privacyPolicyId ) {
			return;
		}

		const { privacyPolicyId, privacyPolicyState } = this.props;
		this.props.acceptPrivacyPolicy( privacyPolicyId, privacyPolicyState );
	};

	openPrivacyPolicyDialog = () => this.setState( { showDialog: true } );

	closePrivacyPolicyDialog = () => this.setState( { showDialog: false } );

	render() {
		const { fetchingPreferences, isPolicyAlreadyAccepted, translate } = this.props;

		if ( fetchingPreferences ) {
			return null;
		}

		if ( isPolicyAlreadyAccepted === true ) {
			return <QueryPrivacyPolicy />;
		}

		const description = translate(
			"We're updating our privacy policy on %(date)s. What's new? {{a}}Learn more here{{/a}}.",
			{
				args: {
					date: this.props.moment( this.props.privacyPolicy.modified ).format( 'LL' ),
				},
				components: {
					a: <ExternalLink href="https://automattic.com/privacy/" target="_blank" />,
				},
			}
		);

		return (
			<div>
				<QueryPrivacyPolicy />
				<Banner
					callToAction={ translate( 'Learn' ) }
					description={ description }
					icon="pages"
					onClick={ this.openPrivacyPolicyDialog }
					title={ translate( 'Privacy Policy Updates.' ) }
				/>

				<PrivacyPolicyDialog
					isVisible={ this.state.showDialog }
					onClose={ this.closePrivacyPolicyDialog }
					content={ this.props.privacyPolicy.content }
					title={ this.props.privacyPolicy.title }
					version={ this.props.privacyPolicy.id }
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const privacyPolicy = getPrivacyPolicyByEntity( state, AUTOMATTIC_ENTITY );
	const privacyPolicyState = getPreference( state, PRIVACY_POLICY_PREFERENCE ) || {};
	const privacyPolicyId = privacyPolicy.id;

	return {
		fetchingPreferences: isFetchingPreferences( state ),
		isPolicyAlreadyAccepted: privacyPolicyState[ privacyPolicyId ] || false,
		privacyPolicyState,
		privacyPolicy,
		privacyPolicyId,
	};
};

const mapDispatchToProps = {
	acceptPrivacyPolicy: ( privacyPolicyId, privacyPolicyState ) =>
		savePreference( PRIVACY_POLICY_PREFERENCE, {
			...privacyPolicyState,
			[ privacyPolicyId ]: true,
		} ),
};

export default connect( mapStateToProps, mapDispatchToProps )(
	localize( PrivacyPolicyBanner )
);
