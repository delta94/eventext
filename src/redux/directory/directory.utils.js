import axios from 'axios';

export const createDirectory = (directory, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/directories`, directory)
);