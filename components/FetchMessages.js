import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { firestore, MESSAGES } from '../firebase/config'
import { convertFirestoreTimestampToJS } from '../helper/Functions'



export default function FetchMessages() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))
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
        <ScrollView>
            {messages.map((message) => (
                <View key={message.id} style={styles.message}>
                    <Text style={styles.date}>{message.created}</Text>
                    <Text>{message.text}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    message: {
        padding: 10,
        margin: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    date: {
        color: '#666',
        fontSize: 12,
    },
})
