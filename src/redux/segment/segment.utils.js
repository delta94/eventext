import axios from 'axios';

export const createSegment = (segment, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/segments`, segment)
);

export const updateSegment = (segment, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/segments/${segment._id}`, segment)
);

export const deleteSegment = (segmentId, userId) => (
    axios.delete(`http://localhost:5000/api/users/${userId}/segments/${segmentId}`)
);