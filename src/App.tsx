import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/sidebar/Sidebar';
import '../src/App.css';
import Example1 from './pages/example-1/Example1';
import Example2 from './pages/example-2/Example2';
import Example3 from './pages/example-3/Example3';
import AddCertificate from './pages/new-certificate/AddCertificate';
import EditCertificate from './pages/new-certificate/EditCertificate';
import Header from './layout/header/Header';
import UserSwitcher from './common/context/UserSwitcher';
import { useLanguage } from './common/context/LanguageContext';

const Start: FC = () => {
  const { translations } = useLanguage();
  return <h1>{translations['start']}</h1>;
};

const App: FC = () => {
  
  return (
    <Router>
        <div className="App">
          <header className="main-header">
            <div className="header">DCCS Tuzla</div>
            <div className="sub-header">
              <UserSwitcher />
              <Header />
            </div>
          </header>
          <div className="container">
            <nav>
              <Sidebar />
            </nav>
            <main className="content">
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/example1" element={<Example1 />} />
                <Route path="/example2" element={<Example2 />} />
                <Route path="/example3" element={<Example3 />} />
                <Route path="/new-certificate" element={<AddCertificate />} />
                <Route path="/edit-certificate/:id" element={<EditCertificate />} />
              </Routes>
            </main>
          </div>
        </div>
    </Router>
  );
};

export default App;
