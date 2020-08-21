import axios from 'axios';

export const createDirectory = (directory, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/directories`, directory)
);

export const deleteDirectory = (directoryId, userId) => (
    axios.delete(`http://localhost:5000/api/users/${userId}/directories/${directoryId}`)
);