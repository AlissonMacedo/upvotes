import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api'

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

export default function Login({ navigation }) {
  const formRef = useRef(null)
  const passwordInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()
  const [password, setPassword] = useState()


  const handleSignUp = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('O nome é obrigatório'),
        password: Yup.string().required('A senha é obrigatória')
      })

      await schema.validate(data, { abortEarly: false })

      const response = await api.post('sign-up', data)

      Alert.alert('Tudo certo!', 'Usuário cadastrado com sucesso!')
      navigation.goBack()

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err)
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);

        return;
      }

      Alert.alert('Erro no registro', 'Ocorreu um erro ao fazer o registro!')
    }

  }, [])


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.master}>
      <StatusBar barStyle="light-content" backgroundColor="#888" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>


        <View style={styles.center}>
          <View style={styles.ViewLogin}>
            <Text style={styles.TextButtonLoginTitle}>Novo usuário</Text>
          </View>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              name="username"
              placeholder="usuário"
              ico="account"
              onSubmitEditing={() => { passwordInputRef.current?.focus() }}
            />

            <Input
              ref={passwordInputRef}
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              ico="onepassword"
              placeholder="senha..."
              textContentType="newPassword"
            />

            <Button loading={loading} color="#7159c1" onPress={() => formRef.current.submitForm()}>
              Cadastrar
            </Button>

          </Form>

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
  InputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 50,
    borderBottomColor: '#7159c1',
    borderBottomWidth: 2,
    margin: 5,
    paddingHorizontal: 10,
    marginTop: 15
  },
  Input: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10
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
