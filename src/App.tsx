import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { DashBoard } from './dashboard/DashBoard';
import { Transactions } from './transactions/Transaction';
import { Header } from './page-components/Header'

const App = () => (
  <Router>
    <div className="w-screen h-screen bg-bg">
      <div className="px-24">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/transaction" element={<Transactions />} />
      </Routes>
    </div>
  </Router>
);

export default App;
