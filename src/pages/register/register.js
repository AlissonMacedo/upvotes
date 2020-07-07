import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api'


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


  async function CreateLogin() {
    const userAndPass =
    {
      "username": `${user}`,
      "password": `${password}`
    }
    const response = await api.post('sign-up', userAndPass)
    console.log(response)

    if (response.status === 200) {

      Alert.alert('Usuário cadastrado com sucesso!')
      navigation.navigate('Login')
    } else {

      'Houve um erro ao fazer o cadastro'
    }
  }


  return (
    <View style={styles.master}>
      <StatusBar style="auto" />
      <View style={styles.center}>

        {loading ? <ActivityIndicator size={50} /> :
          <View>
            <View style={styles.ViewLogin}>
              <Text style={styles.TextButtonLoginTitle}>Novo usuário</Text>
            </View>
            <Form ref={formRef} onSubmit={(data) => { console.log(data) }}>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                name="name"
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
