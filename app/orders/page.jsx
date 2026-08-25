"use client";

import { getOrders } from "../js/orders-api";
import useAuthStore from "../js/AuthStore";
import Loader from "../components/Loader";

import { useState, useEffect } from "react";

const statusStyles = {
  pending: "bg-yellow-600",
  shipped: "bg-blue-600",
  delivered: "bg-green-600",
};

const orderTotal = (order) =>
  (order.order_items || []).reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

export default function Orders() {
  const [data, setData] = useState([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrderItems = async () => {
      try {
        const getdata = await getOrders(user.id);
        setData(getdata);
      } catch (error) {
        console.log("error is : ", error);
      }
    };

    fetchOrderItems();
  }, [user?.id]);

  if(data.length === [] || 0) {
    return(
      <Loader />
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 flex items-center gap-3 text-4xl font-bold text-white">
          My Orders
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((order) => (
            <div
              key={order.id}
              className="group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-700 transition-all duration-300 hover:-translate-y-1"
            >
             
              <div className="flex items-center justify-between border-b border-zinc-800 p-5">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Order #{order.id}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-semibold capitalize ${
                    statusStyles[order.status] || statusStyles.pending
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="p-5 space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-zinc-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-green-400">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/60 p-5">
                <span className="text-zinc-400 font-medium">Total</span>
                <span className="text-2xl font-bold text-green-400">
                  ${orderTotal(order).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}