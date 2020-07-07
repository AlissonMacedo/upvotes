import React from 'react';
import { render } from 'react-native-testing-library'

import api from '../../services/api'

import NewMessage from '../../pages/newMessage/newMessage'

describe('New message, items', () => {
  it('should contains message inputs', async () => {
    const { getByPlaceholder } = render(<NewMessage />)

    expect(getByPlaceholder('mensagem...')).toBeTruthy();
  })
})
describe('New message, post', () => {
  it('should new message', async () => {

    const user = 'alissonmacedo'
    const password = '123123123'

    const userToSend = {
      "username": `${user}`,
      "password": `${password}`
    }

    const responseLogin = await api.post('sign-in', userToSend)

    api.defaults.headers.Authorization = `Bearer ${responseLogin.data}`;

    const messageToSend =
    {
      "content": 'Teste de messagem',
    }

    const response = await api.post('feed', messageToSend)


    expect(response.status).toEqual(201);

  })
})