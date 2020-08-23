import React from 'react';
import { connect } from 'react-redux';

import './texts-drafts.styles.scss';

import TextItems from '../text-items/text-items.component';

const TextsDrafts = ({ textsDrafts }) => {
    const texts = textsDrafts.reverse().map(text => {
        return <TextItems key={text._id} item={text} />
    });

    return (
        <div className='texts-drafts'>
            <h2>Drafts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Segment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {texts}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    textsDrafts: Object.values(state.texts).filter(text => text.status === 'Draft')
});

export default connect(mapStateToProps)(TextsDrafts);