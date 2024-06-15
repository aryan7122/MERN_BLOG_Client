// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/layout/Loading.jsx';
import { AuthProvider } from './context/AuthContext';
import { setLoading } from './redux/slices/apiSlice.jsx';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.api.loading);

  useEffect(() => {
    const loadInitialData = async () => {
      dispatch(setLoading(true));
      try {
        // Simulate data fetching or initialization
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadInitialData();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
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
          <Route path="/edit" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><div>Admin Page</div></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
