import { Provider } from 'react-redux';
import { store } from './store/store';
import FloorManagement from './components/FloorPlan';

function App() {
  return (
    <Provider store={store}>
      <FloorManagement />
    </Provider>
  );
}

export default App