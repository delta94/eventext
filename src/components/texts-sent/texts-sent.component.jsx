import React from 'react';
import { connect } from 'react-redux';

import './texts-sent.styles.scss';

import TextItems from '../text-items/text-items.component';

const TextsSent = ({ textsSent }) => {
    const texts = textsSent.reverse().map(text => <TextItems key={text._id} item={text} />);

    const emptyTexts = () => {
        if (texts.length === 0) return <div className='no-texts'>There are no messages to display</div>;
    };

    return (
        <div className='texts-sent'>
            <h2>Sent</h2>
            <table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Date Sent</th>
                        <th>Segment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {texts}
                </tbody>
            </table>
            {emptyTexts()}
        </div>
    )
}

const mapStateToProps = state => ({
    textsSent: Object.values(state.texts).filter(text => text.status === 'Sent')
});

export default connect(mapStateToProps)(TextsSent);