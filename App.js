import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native'
import { addDoc, collection, firestore, MESSAGES, serverTimestamp, query, onSnapshot, orderBy } from './firebase/config'
import React, { useEffect, useState } from 'react'
import { convertFirestoreTimestampToJS } from './helper/Functions'
import { or } from 'firebase/firestore'



export default function App() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  const save = async () => {
    const docref = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage.trim(),
      created: serverTimestamp(),
    }).catch(error => console.error('Error adding document: ', error))
    setNewMessage('')
  }

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES),orderBy('created', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        tempMessages.push({ ...doc.data(), id: doc.id, created: convertFirestoreTimestampToJS(doc.data().created) })
      })
      setMessages(tempMessages)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Send a message...'
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          multiline={true}
          numberOfLines={2}
        />
        <Button title='Save' onPress={() => save()} />
      </View>
      <ScrollView>
        {messages.map((message) => (
          <View key={message.id} style={styles.message}>
            <Text style={styles.date}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 8,
    paddingTop: 16
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: 16,
    marginBottom: 16
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    minHeight: 40, 
    textAlignVertical: 'top'
  },
  message: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc'
  },
  date: {
    fontSize: 10,
  }
})
