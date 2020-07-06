import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Yup from 'yup'
import { Form } from '@unform/mobile';
import { Scope } from '@unform/core';

import Button from '../../components/Button'
import Input from '../../components/Input'


import api from '../../services/api'


export default function Login({ navigation }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false);


  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        password: Yup.string().required('A senha é obrigatória')
      })

      await schema.validate(data, { abortEarly: false })

      console.log(data);

      // reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err)
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }

    }
    // const userToSend = {
    //   "username": `${user}`,
    //   "password": `${password}`
    // }

    // const response = await api.post('sign-in', userToSend)

    // console.log(userToSend)
    // if (response.status !== 200) {
    //   Alert.alert('Houve um erro no login!')
    // }
    // api.defaults.headers.Authorization = `Bearer ${response.data}`;

    // navigation.navigate('Home')

  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.master}>
      <StatusBar barStyle="light-content" backgroundColor="#888" />
      <View style={styles.center}>
        <View>
          <View style={styles.ViewLogin}>
            <Text style={styles.TextButtonLoginTitle}>Log in</Text>
          </View>
          <Form ref={formRef} onSubmit={handleSubmit}>

            <Input name="name" placeholder="usuário" ico="account" />

            <Input name="password" ico="onepassword" placeholder="senha..." />

            <Button loading={loading} onPress={() => formRef.current.submitForm()}>
              Faça Login
            </Button>

            <View style={styles.ViewTextSubLogin}>
              <Text style={styles.TextSubLogin}>Ainda não tem uma conta?</Text>
              <Text style={styles.TextSubLoginNegrito} onPress={() => navigation.navigate('Register')} > Click Aqui</Text>
            </View>
          </Form>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  master: {
    flex: 1,
  },
  center: {
    flex: 1,
    backgroundColor: 'rgb(59, 64, 78)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewLogin: {
    marginBottom: 50
  },
  TextButtonLoginTitle: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold'
  },
  ButtonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    width: 300,
    height: 80,
    borderRadius: 40,
    marginTop: 30
  },
  TextButtonLogin: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  TextSubLogin: {
    color: '#fff',
    fontSize: 15,
    fontWeight: "normal"
  },
  TextSubLoginNegrito: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  ViewTextSubLogin: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  }

});
