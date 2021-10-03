import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Theme from './styles/Theme';
import ProjectList from './screens/ProjectList';


export default function App() {
  
  useEffect( () => {
    fetch(url)
    .then(results => results.json())
    .then(info => setData(info))}, []);

  if (data) {
    return (
      <Theme>
        <ProjectList data = {data}/>
      </Theme>
    )
  }
  else {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
}
