import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Registration = () => {
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/php-rest-api/register.php', {
        fullName, email, password
      });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);  // Log server response error
        toast.error(error.response.data.message || 'Registration failed. Try again.');
      } else {
        console.log(error.message);  // Log client-side error
        toast.error('Registration failed. Try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            className="border p-2 rounded w-full"
            type="text"
            value={fullName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Registration;