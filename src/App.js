// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/pages/Home';
import Motivation from './components/pages/Motivation';
import BookSummary from './components/pages/BookSummary';
import SelfDevelopment from './components/pages/SelfDevelopment';
import Story from './components/pages/Story';
import Fact from './components/pages/Fact';
import NotFound from './components/pages/NotFound';
import Header from './components/layout/Header';
import BlogEditor from './components/pages/BlogEditor';
import GetPostId from './components/pages/GetPostId';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/layout/Loading';
import { AuthProvider } from './context/AuthContext';
import { setLoading } from './redux/slices/apiSlice';
import PostLike from './components/other/PostLike';
import UserList from './components/other/UserList';
import Footer from './components/layout/Footer';

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
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <AuthProvider>
          <main className="flex-grow">
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
              <Route path="/like" element={<PostLike />} />
              <Route path="/edit" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
              <Route path="/user" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </AuthProvider>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
