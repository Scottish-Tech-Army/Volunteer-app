import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Theme from './styles/Theme'
import ProjectList from './screens/ProjectList';

export default function App() {
  return (
    <Theme>
      <ProjectList />
    </Theme>

  );
}


