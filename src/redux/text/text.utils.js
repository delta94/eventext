import axios from 'axios';

export const createText = (text, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/texts`, text)
);

export const updateText = (text, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/texts/${text._id}`, text)
);

export const deleteText = (textId, userId) => (
    axios.delete(`http://localhost:5000/api/users/${userId}/texts/${textId}`)
);

export const sendText = (textId, userId) => (
    axios.post(`http://localhost:5000/api/users/${userId}/texts/send/${textId}`)
);