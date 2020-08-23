import React from 'react';
import { connect } from 'react-redux';

import './segments.styles.scss';

import SegmentItems from '../segment-items/segment-items.component';

const Segments = ({ segments }) => (
            
    <div className='segments'>
        <table>
            <thead>
                <tr>
                    <th>Segment Name</th>
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
    </div>
);

const mapStateToProps = state => ({
    segments: Object.values(state.segments)
});

export default connect(mapStateToProps)(Segments);