import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api'

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

export default function Login({ navigation }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()


  const postMessage = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        content: Yup.string().required('A mensagem é obrigatória'),

      })

      await schema.validate(data, { abortEarly: false })

      const response = await api.post('feed', data)
      console.log(data)


      Alert.alert('Mensagem postada com sucesso!')
      navigation.navigate('Home')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err)
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);

        return;
      }

      Alert.alert('Erro no envio', 'Ocorreu um erro ao enviar a mensagem!')
    }

  }, [])

  return (
    <View style={styles.master}>
      <StatusBar style="auto" />
      <View style={styles.center}>

        {loading ? <ActivityIndicator size={50} /> :
          <View>
            <View style={styles.ViewLogin}>
              <Text style={styles.TextButtonLoginTitle}>Nova Mensagem</Text>
            </View>
            <Form ref={formRef} onSubmit={postMessage}>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                name="content"
                placeholder="mensagem..."
                ico="android-messages"
                returnKeyType="next"
                nSubmitEditing={() => { formRef.current.submitForm() }}
              />

              <Button loading={loading} color="#7159c1" onPress={() => formRef.current.submitForm()}>
                Enviar
              </Button>
            </Form>

          </View>
        }

      </View>

    </View>
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
