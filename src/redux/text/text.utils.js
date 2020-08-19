import axios from 'axios';

export const fetchAllTexts = userId => (
    axios.get(`http://localhost:5000/api/users/${userId}/texts`)
);

export const createText = (text, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/texts`, text)
);

export const updateText = (text, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/texts/${text._id}`, text)
);

export const deleteText = (textId, userId) => (
    axios.delete(`http://localhost:5000/api/users/${userId}/texts/${textId}`)
);