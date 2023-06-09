import './App.css';
import Form from './components/Form';
import Log from './components/Log';
import { Provider } from 'react-redux';
import store from './utils/store';

function App() {
  return (
    <Provider store={store}>
      <Form/>
      <Log/>
    </Provider>
  );
}

export default App;
