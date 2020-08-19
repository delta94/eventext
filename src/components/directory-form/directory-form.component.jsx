import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './directory-form.styles.scss';

import DirectoryItems from '../directory-items/directory-items.component';

const DirectoryForm = ({ directories, segment }) => {

    return (
        <div className='directory-form'>
            {directories.map(directory => (
                <DirectoryItems key={directory._id} directory={directory} />
            ))}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    directories: Object.values(state.directories),
    segment: state.segments[ownProps.match.params.segmentId]
});

export default withRouter(connect(mapStateToProps)(DirectoryForm));