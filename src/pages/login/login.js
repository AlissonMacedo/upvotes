import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet, Text, View, TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Yup from 'yup'
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button'
import Input from '../../components/Input'

import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'


export default function Login({ navigation }) {
  const formRef = useRef(null);
  const passwordInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false);

  const handleSignIn = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('O nome é obrigatório'),
        password: Yup.string().required('A senha é obrigatória')
      })

      await schema.validate(data, { abortEarly: false })

      const response = await api.post('sign-in', data)

      api.defaults.headers.Authorization = `Bearer ${response.data}`;

      navigation.navigate('Home')

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err)
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);

        return;
      }

      Alert.alert('Erro na atutenticação', 'Ocorreu um erro ao fazer login!')
    }

  }, [])


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.master}>
      <StatusBar barStyle="light-content" backgroundColor="#888" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
        <View style={styles.center}>
          <View>
            <View style={styles.ViewLogin}>
              <Text style={styles.TextButtonLoginTitle}>Log in</Text>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>

              <Input
                autoCapitalize="none"
                autoCorrect={false}
                name="username"
                placeholder="usuário"
                ico="account"
                returnKeyType="next"
                onSubmitEditing={() => { passwordInputRef.current?.focus() }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                ico="onepassword"
                placeholder="senha..."
                returnKeyType="send"
                onSubmitEditing={() => { formRef.current.submitForm() }}
              />

              <Button loading={loading} color="#7159c1" onPress={() => formRef.current.submitForm()}>
                Faça Login
              </Button>

              <View style={styles.ViewTextSubLogin}>
                <Text style={styles.TextSubLogin}>Ainda não tem uma conta?</Text>
                <Text style={styles.TextSubLoginNegrito} onPress={() => navigation.navigate('Register')} > Click Aqui</Text>
              </View>
            </Form>
          </View>
        </View>
      </ScrollView>

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
    color: '#7159c1',
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
