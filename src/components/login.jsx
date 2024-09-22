import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/php-rest-api/login.php', {
        email, password
      });

      if (response.data.message === 'Login successful') {
        // Save token or user info in localStorage
        localStorage.setItem('authToken', response.data.token);
        toast.success(response.data.message);
        navigate('/'); // Redirect to home after login
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Login failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            className="border p-2 rounded w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            className="border p-2 rounded w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;