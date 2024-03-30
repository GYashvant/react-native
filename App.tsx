import React, {createContext, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Keyboard from './src/components/KeyBoard';
import {ThemeContext} from './src/context/ThemeContext';
import {myColors} from './src/styles/Colors';

function App() {
  return (
    <ThemeContext.Provider value={'dark'}>
      <SafeAreaView style={styles.mainContainer}>
        <Keyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: myColors.dark,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default App;
