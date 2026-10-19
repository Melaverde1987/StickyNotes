import axios from 'axios';

axios.defaults.baseURL = 'https://6ace7790f338359cf1c3885e.mockapi.io/api';

export const fetchCards = async () => {
  const response = await axios.get('/cards');
  return response.data;
};

export const createCard = async card => {
  const response = await axios.post('/cards', card);
  return response.data;
};

export const updateCard = async (id, card) => {
  const response = await axios.put(`/cards/${id}`, card);
  return response.data;
};

export const deleteCardById = async cardId => {
  const response = await axios.delete(`/cards/${cardId}`);
  return response.data;
};

export const completeTask = async (card, idTask) => {
  const items = card.items.map(item =>
    item.id === idTask ? { ...item, completed: !item.completed } : item
  );

  const response = await axios.put(`/cards/${card.id}`, {
    ...card,
    items,
  });

  return response.data;
};

export const saveCardPosition = async card => {
  const response = await axios.put(`/cards/${card.id}`, card);
  return response.data;
};
