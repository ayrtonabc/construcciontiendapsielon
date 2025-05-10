import Auth from './components/auth/Auth';
import { Routes, Route } from 'react-router-dom';
import { IndexRoutes, AdminRoutes } from './routes';
import AuthPage from "./components/auth/AuthPage"


function App() {
    return (
      <Routes>
        {IndexRoutes}
        <Route path='/login' element={<AuthPage/>} />
        {AdminRoutes}
      </Routes>
    );
}

export default App;
