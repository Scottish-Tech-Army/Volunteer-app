import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Theme from './styles/Theme';
import ProjectList from './screens/ProjectList';
import 'dotenv/config';

export default function App() {
  
  const [data, setData] = useState(null);
  const url = process.env.BASE_URL + '/projects';

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
