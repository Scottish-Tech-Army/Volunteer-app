import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Theme from './styles/Theme';
import ProjectList from './screens/ProjectList';
import Constants from 'expo-constants';

export default function App() {
  
  const [data, setData] = useState(null);
  const url = Constants.manifest.extra.base_url + '/projects';

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
