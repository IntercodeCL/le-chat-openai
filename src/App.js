import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="mx-2">LeCHAT</h1>
      <div className="mx-2">INTEGRACIÓN CON OPENAI</div>
      <Chat />
    </div>
  );
}

export default App;
