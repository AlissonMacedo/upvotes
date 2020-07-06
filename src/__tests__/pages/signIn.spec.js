import React from 'react';
import { render } from 'react-native-testing-library'

import api from '../../services/api'

import Login from '../../pages/login'

describe('SignIn page', () => {
  it('should contains user/password inputs', async () => {
    const { getByPlaceholder } = render(<Login />)

    expect(getByPlaceholder('usuário')).toBeTruthy();
    expect(getByPlaceholder('senha')).toBeTruthy();
  })
})
describe('SignIn page', () => {
  it('should users login', async () => {
    const { getByPlaceholder } = render(<Login />)

    const user = 'alissonmacedo'
    const password = '123123123'

    const userToSend = {
      "username": `${user}`,
      "password": `${password}`
    }

    const response = await api.post('sign-in', userToSend)

    expect(response.status).toEqual(200);

  })
})