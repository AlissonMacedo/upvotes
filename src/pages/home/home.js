import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import api from '../../services/api'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    loadMessages();

  }, []);

  async function loadMessages() {
    setLoading(true);
    const response = await api.get('feeds');


    setMessages(response.data);

    setLoading(false)

    console.log(response.data)
  }


  async function voteLikes(id) {
    const message =
    {
      "feedId": `${id}`,
      "like": true,
    }
    const response = await api.post('reaction', message)

    if (response.status === 200) {
      loadMessages()
      Alert.alert('Voto Recebido com sucesso!')
    } else {
      Alert.alert('Houve um erro ao votar!')
    }
  }

  async function voteLoves(id) {
    const message =
    {
      "feedId": `${id}`,
      "love": true
    }
    const response = await api.post('reaction', message)

    if (response.status === 200) {
      loadMessages()
      Alert.alert('Voto Recebido com sucesso!')
    } else {
      Alert.alert('Houve um erro ao votar!')
    }
  }

  return (
    <View style={styles.master}>
      <StatusBar style="auto" />
      <View style={styles.center}>
        {loading ? <ActivityIndicator size={40} color="#7159c1" /> : <FlatList style={{ width: '100%' }} data={messages}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <View style={styles.CardMessage}>
            <View style={styles.Card}>
              <View style={styles.ViewMessage}>
                <View style={styles.ViewMessageInter}>
                  <Text style={styles.MessageContent}>{item.content}</Text>
                </View>
                <Text style={styles.MessageAuthor}>{`Por: ${item.author.username}`}</Text>
              </View>
              <View style={styles.ViewOpcoes}>
                <View style={styles.ViewIcons}>
                  <TouchableOpacity style={styles.buttonLike} onPress={() => voteLikes(item.id)}>
                    <AntDesign name="like1" size={24} color={item.likes > 0 ? '#7159c1' : '#666360'} />
                    <Text style={{ marginLeft: 10 }}>{item.likes}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.ViewIcons}>
                  <TouchableOpacity style={styles.buttonLike} onPress={() => voteLoves(item.id)}>
                    <MaterialCommunityIcons name="heart" size={24} color={item.loves > 0 ? '#7159c1' : '#666360'} />
                    <Text style={{ marginLeft: 10 }}>{item.loves}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>}
        />}
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
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CardMessage: {

    width: '100%',
    height: 200,
    marginTop: 30,
    paddingHorizontal: 100
  },
  Card: {
    borderRadius: 10,
    backgroundColor: '#FFF'
  },
  ViewMessage: {
    height: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#7159c1',
    padding: 10
  },
  ViewMessageInter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MessageContent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF'
  },
  MessageAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  ViewMessageMaster: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewIcons: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLike: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  ViewOpcoes: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
