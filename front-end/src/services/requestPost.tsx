import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3001`,
});

export const requestLogin = (endpoint: string, body: any) => api.post(endpoint, body)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const validateToken = (endpoint: string, token: any) => api.get(endpoint, {
  headers: {
    Authorization: token,
  },
})
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const getUser = (endpoint: string, token: string) => api.get(endpoint, {
  headers: {
    Authorization: token,
  },
});

export const getTransactionsById = (id: number) => api.get(`/transaction/${id}`)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const getUserById = (id: number) => api.get(`/user/${id}`)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const createTransaction = (endpoint: string, body: any) => api
  .post(endpoint, body)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const getBalanceById = (id: number) => api.get(`/user/balance/${id}`)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const getAllUsersNames = () => api.get(`/user/names`)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));
