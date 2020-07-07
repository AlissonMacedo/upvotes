import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api'


export default function Login({ navigation }) {
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
            <View style={styles.InputView}>
              <Feather name="users" size={24} color="white" />
              <TextInput style={styles.Input} placeholder="usuário..." onChangeText={text => setUser(text)} />
            </View>

            <View style={styles.InputView}>
              <MaterialCommunityIcons name="onepassword" size={24} color="white" />
              <TextInput style={styles.Input} placeholder="senha.." onChangeText={text => setPassword(text)} />
            </View>

            <TouchableOpacity style={styles.ButtonLogin} onPress={() => CreateLogin()}>
              <Text style={styles.TextButtonLogin}>Cadastrar</Text>
            </TouchableOpacity>

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
