import { Map } from './modules/Map';
import { MainMenu } from './modules/MainMenu';
import { getServicesAsync } from './slice/slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getServicesAsync());
  });

  return (
    <>
      <MainMenu />
      <Map />
    </>
  );
}

export default App;
