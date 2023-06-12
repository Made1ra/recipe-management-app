import { useSelector } from 'react-redux';
import { RootState } from './store';
import Recipes from './components/Recipes';
import Authentication from './components/Authentication';

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <>
      {isAuthenticated ? <Recipes /> : <Authentication />}
    </>
  );
}

export default App;
