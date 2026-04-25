import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const orderHistory = [
  { id: 1, date: '2026-04-25', symbol: 'AAPL', type: 'Buy', status: 'Completed', price: 175.24, quantity: 10, total: 1752.40 },
  { id: 2, date: '2026-04-24', symbol: 'TSLA', type: 'Sell', status: 'Completed', price: 238.45, quantity: 5, total: 1192.25 },
  { id: 3, date: '2026-04-24', symbol: 'NVDA', type: 'Buy', status: 'Pending', price: 485.30, quantity: 2, total: 970.60 },
  { id: 4, date: '2026-04-23', symbol: 'AMD', type: 'Buy', status: 'Cancelled', price: 165.20, quantity: 8, total: 1321.60 },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');

  const filteredOrders = filter === 'All' ? orderHistory : orderHistory.filter(o => o.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-[Inter]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Order History</h2>
          <p className="text-slate-500">Track your trade executions and pending requests</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white rounded-lg border border-slate-200 p-1">
          {['All', 'Completed', 'Pending', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${filter === status ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-sm">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Symbol</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-slate-600">{order.date}</td>
                <td className="px-6 py-4 font-bold text-slate-800">{order.symbol}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${order.type === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {order.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {order.status === 'Completed' && <CheckCircle size={16} className="text-green-500" />}
                    {order.status === 'Pending' && <Clock size={16} className="text-amber-500" />}
                    {order.status === 'Cancelled' && <XCircle size={16} className="text-red-500" />}
                    {order.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium">${order.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-bold text-slate-900">${order.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}