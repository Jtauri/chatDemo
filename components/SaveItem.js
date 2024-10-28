import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firestore, MESSAGES } from '../firebase/config'
import styles from '../styles/Styles'



export default function SaveItem() {

    const [newMessage, setNewMessage] = useState('')

    const save = async () => {
        const docref = await addDoc(collection(firestore, MESSAGES), {
            text: newMessage.trim(),
            created: serverTimestamp(),
        }).catch(error => console.error('Error adding document: ', error))
        setNewMessage('')
    }


    return (
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
    )
}
