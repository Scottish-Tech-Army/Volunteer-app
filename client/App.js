import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Theme from './styles/Theme';
import ProjectList from './screens/ProjectList';


export default function App() {
  
  const [data, setData] = useState(null);

  // To fecth from Firebase API:
  // const url = 'https://sva-api-default-rtdb.europe-west1.firebasedatabase.app/.json'
  // setData(info.projects)
  //
  // To fetch from Node server:
  const url = 'http://localhost:5000/projects'
  // 'setData(info)'


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
