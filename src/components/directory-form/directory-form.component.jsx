import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const DirectoryForm = ({ directories, segment }) => {

    const directoryList = directories.map(directory => (
        <div key={directory._id} className='directory'>
            {directory.name} {directory.mobile}
        </div>
    ));

    return (
        <div className='directory-form'>
            {directoryList}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    directories: Object.values(state.directories),
    segment: state.segments[ownProps.match.params.segmentId]
});

export default withRouter(connect(mapStateToProps)(DirectoryForm));