import React from 'react';
import { withRouter } from 'react-router-dom';

import './segment-items.styles.scss';

import Button from '../custom-button/custom-button.component';

const SegmentItems = ({ segment, history }) => (
    <tr>
        <td 
            className='name'
            onClick={() => history.push(`/segments/edit/${segment._id}`)}>
            {segment.name}
        </td>
        <td className='center'>
            {segment.directoryIds.length}
        </td>
        <td className='right'>
            <Button color='blue' link={`segments/edit/${segment._id}`}>Edit</Button>&nbsp;
            <Button color='gray'>Delete</Button>
        </td>
    </tr>
)

export default withRouter(SegmentItems);