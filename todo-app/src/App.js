import React, { Component } from 'react';
import './App.css';
//import Counter from './components/counter/Counter';
import FirstComponent from './components/learning/FirstComponent.js';
import ThirdComponent from './components/learning/ThirdComponent';
import ToDoApp from './components/todo/ToDoApp';
import './bootstrap.css'
 
class App extends Component {
  render() {
    return (
      <div className="App">
      {/*<Counter></Counter>*/}
      <ToDoApp/>
      </div>
    );
  }
}

function SecondComponent (){
  return(
    <div className = "SecondComponent">My Second Function Component !!</div>
  );
}

//eslint-disable-next-line
class LearningComponent extends Component {
  render() {
    return (
      <div className="LearningComponent">
       
       <FirstComponent></FirstComponent>
       <SecondComponent></SecondComponent>
       <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}

export default App;