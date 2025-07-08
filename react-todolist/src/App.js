import logo from './logo.svg';
import './App.css';
import TodoList from './ToDoList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <TodoList />
      </header>
    </div>
  );
}

export default App;
