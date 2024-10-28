import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import React  from 'react'
import FetchMessages from './components/FetchMessages'
import SaveItem from './components/SaveItem'
import styles from './styles/Styles'


export default function App() {
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <SaveItem />
      <FetchMessages />
    </SafeAreaView>
  )
}