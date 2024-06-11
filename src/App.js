import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Motivation from './components/pages/Motivation.jsx';
import BookSummary from './components/pages/BookSummary.jsx';
import SelfDevelopment from './components/pages/SelfDevelopment.jsx';
import Story from './components/pages/Story.jsx';
import Fact from './components/pages/Fact.jsx';
import NotFound from './components/pages/NotFound';
import Header from './components/layout/Header';
import BlogEditor from './components/pages/BlogEditor';
import GetPostId from './components/pages/GetPostId';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <Router>
    <Header />
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/motivation" element={<Motivation />} />
        <Route path="/BookSummary" element={<BookSummary />} />
        <Route path="/selfDevelopment" element={<SelfDevelopment />} />
        <Route path="/Story" element={<Story />} />
        <Route path="/fact" element={<Fact />} />
        <Route path="/post/:id" element={<GetPostId />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit" element={<ProtectedRoute ><BlogEditor /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><div>Admin Page</div></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
