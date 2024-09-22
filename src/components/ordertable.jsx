import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost/php-rest-api/orders-fetch.php');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Send updated status to the server
      await axios.post('http://localhost/php-rest-api/update-status.php', {
        order_id: orderId,
        status: newStatus
      });
    } catch (err) {
      setError('Failed to update status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders Table</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Item Name</th>
            <th className="border border-gray-300 px-4 py-2">Item Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="border border-gray-300 px-4 py-2">{order.order_id}</td>
              <td className="border border-gray-300 px-4 py-2">{order.name}</td>
              <td className="border border-gray-300 px-4 py-2">{order.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{order.address}</td>
              <td className="border border-gray-300 px-4 py-2">{order.item_name}</td>
              <td className="border border-gray-300 px-4 py-2">{order.item_price}</td>
              <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">{order.total}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={order.status || 'On Process'}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  className="p-1 border border-gray-300"
                >
                  <option value="On Process">On Process</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
