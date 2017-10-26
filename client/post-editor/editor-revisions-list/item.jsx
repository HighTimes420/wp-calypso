/**
 * External dependencies
 *
 * @format
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';
import { isObject } from 'lodash';

/**
 * Internal dependencies
 */
import PostTime from 'reader/post-time';

class EditorRevisionsListItem extends PureComponent {
	selectRevision = () => {
		this.props.selectRevision( this.props.revision.id );
	};

	render() {
		const hasAddedChanges = this.props.revision.summary.added > 0;
		const hasRemovedChanges = this.props.revision.summary.removed > 0;

		return (
			<button
				className="editor-revisions-list__button"
				onClick={ this.selectRevision }
				type="button"
			>
				<span className="editor-revisions-list__date">
					<PostTime date={ this.props.revision.date } />
				</span>
				&nbsp;
				<span className="editor-revisions-list__author">
					{ isObject( this.props.revision.author ) &&
						this.props.translate( 'by %(author)s', {
							args: { author: this.props.revision.author.display_name },
						} ) }
				</span>
				<div className="editor-revisions-list__changes">
					{ hasAddedChanges && (
						<span className="editor-revisions-list__additions">
							{ this.props.translate( '%(changes)d word added', '%(changes)d words added', {
								args: { changes: this.props.revision.summary.added },
								count: this.props.revision.summary.added,
							} ) }
						</span>
					) }

					{ hasAddedChanges && hasRemovedChanges && ', ' }

					{ hasRemovedChanges && (
						<span className="editor-revisions-list__deletions">
							{ this.props.translate( '%(changes)d word removed', '%(changes)d words removed', {
								args: { changes: this.props.revision.summary.removed },
								count: this.props.revision.summary.removed,
							} ) }
						</span>
					) }

					{ ! hasAddedChanges &&
					! hasRemovedChanges && (
						<span className="editor-revisions-list__minor-changes">
							{ this.props.translate( 'minor changes' ) }
						</span>
					) }
				</div>
			</button>
		);
	}
}

EditorRevisionsListItem.propTypes = {
	revision: PropTypes.object.isRequired,
	selectRevision: PropTypes.func.isRequired,
	translate: PropTypes.func.isRequired,
};

export default localize( EditorRevisionsListItem );
