import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import BlogDetailPage from './pages/BlogDetailPage';

// Auth Pages
import AdminLogin from './components/Auth/AdminLogin';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogList from './pages/admin/BlogList';
import BlogForm from './pages/admin/BlogForm';
import CategoryList from './pages/admin/CategoryList';
import CategoryForm from './pages/admin/CategoryForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-orange-50 to-amber-50">
          {/* Natural background texture */}
          <div className="fixed inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 to-secondary-100/30"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(237, 124, 71, 0.08) 0%, transparent 40%), 
                               radial-gradient(circle at 80% 70%, rgba(52, 156, 92, 0.08) 0%, transparent 40%)`
            }}></div>
          </div>
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/:slug" element={<BlogDetailPage />} />
            
            {/* Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/blogs" element={
              <ProtectedRoute>
                <BlogList />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/blogs/new" element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/blogs/:id/edit" element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/categories" element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/categories/new" element={
              <ProtectedRoute>
                <CategoryForm />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/categories/:id/edit" element={
              <ProtectedRoute>
                <CategoryForm />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;