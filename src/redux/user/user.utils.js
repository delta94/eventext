import axios from 'axios';

export const createUser = user => (
    axios.post('http://localhost:5000/api/users/register', user)
);

export const fetchAllData = userId => (
    axios.all(
        [axios.get(`http://localhost:5000/api/users/${userId}/texts`),
        axios.get(`http://localhost:5000/api/users/${userId}/segments`),
        axios.get(`http://localhost:5000/api/users/${userId}/directories`)])
);