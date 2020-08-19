import axios from 'axios';

export const deleteSegment = (segmentId, userId) => (
    axios.delete(`http://localhost:5000/api/users/${userId}/segments/${segmentId}`)
);