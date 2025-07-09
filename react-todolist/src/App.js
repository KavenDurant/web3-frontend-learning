import logo from './logo.svg';
import './App.css';
import TodoList from './ToDoList';
import TodoList2 from './TodoList2';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        {/* <TodoList /> */}
        <TodoList2 />
      </header>
    </div>
  );
}

export default App;
