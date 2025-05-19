import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';

const Routes = () => useRoutes(routes);

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
