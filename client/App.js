import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Theme from './styles/Theme'
import ProjectList from './screens/ProjectList';
//import {info} from '../api/data.js';

export default function App() {

  const info = 
  {projects: [
      {
          key: "SVA",
          name: "STA-volunteer App",
          type: "Team-managed software",
          client: "STA - internal",
          role: "Lead developer",
          description: "The lead tester is a coordination and management role, so an understanding of and experience in a number of testing disciplines, rather than depth in any specific one.",
          skills: ["React Native", "Node.js"],
          hours: "5-10 hours per week",
          required: "One person",
          buddying: true
      }
  ]}

  const [data, setData] = useState(info.projects);

  // To fecth from Firebase API:
  // const url = 'https://sva-api-default-rtdb.europe-west1.firebasedatabase.app/.json'
  // setData(info.projects)
  //
  // To fetch from Node server:
  const url = 'http://localhost:5000/projects'
  // 'setData(info)'

  // useEffect( () => {
  // fetch(url)
  // .then(results => results.json())
  // .then(info => setData(info))}, []);

  

  //if (data) {
  return (
    <Theme>
      <ProjectList data = {data}/>
    </Theme>
  )
  // }
  // else {
  // return (
  //   <SafeAreaView>
  //     <Text>Loading...</Text>
  //   </SafeAreaView>
  // )
  // }
}
