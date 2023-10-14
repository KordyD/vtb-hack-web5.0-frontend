import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/fonts/VTBGroupUI-Regular/VTBGroupUI-Regular.ttf';
import './assets/fonts/VTBGroupUI-Medium/VTBGroupUI-Medium.ttf';
import './assets/fonts/VTBGroupUI-Light/VTBGroupUI-Light.ttf';
import './assets/fonts/VTBGroupUI-Bold/VTBGroupUI-Bold.ttf';
import './assets/fonts/VTBGroupUI-DemiBold/VTBGroupUI-DemiBold.ttf';
import './normilize.css';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // /* </React.StrictMode> */
);
