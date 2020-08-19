import axios from 'axios';

export const fetchAllDirectories = userId => (
    axios.get(`http://localhost:5000/api/users/${userId}/directories`)
);