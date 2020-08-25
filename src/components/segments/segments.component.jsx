import React from 'react';
import { connect } from 'react-redux';

import './segments.styles.scss';

import SegmentItems from '../segment-items/segment-items.component';

const Segments = ({ segments }) => {
    const emptyTexts = () => {
        if (segments.length === 0) return <div className='no-texts'>There are no groups to display</div>;
    };
    
    return (
        <div className='segments'>
            <table>
                <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Count</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {segments.reverse().map(segment => (
                        <SegmentItems key={segment._id} segment={segment} />
                    ))}
                </tbody>
            </table>
            {emptyTexts()}
        </div>
    )
};

const mapStateToProps = state => ({
    segments: Object.values(state.segments)
});

export default connect(mapStateToProps)(Segments);