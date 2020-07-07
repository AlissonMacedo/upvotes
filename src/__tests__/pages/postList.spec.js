import React from 'react';

import api from '../../services/api'

import Home from '../../pages/home/home'

describe('Get List of message', () => {
  it('should list of messages', async () => {

    const user = 'alissonmacedo'
    const password = '123123123'

    const userToSend = {
      "username": `${user}`,
      "password": `${password}`
    }

    const responseLogin = await api.post('sign-in', userToSend)

    api.defaults.headers.Authorization = `Bearer ${responseLogin.data}`;

    const response = await api.get('feeds');

    expect(response.status).toEqual(200);

  })
})