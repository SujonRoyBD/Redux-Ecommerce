"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/redux/store/store"; // আপনার স্টোর লোকেশন অনুযায়ী ঠিক করুন
import { increment, decrement, removeFromCart } from "@/components/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalPrice = items.reduce((total, item) => total + item.prise * item.qty, 0);

  return (
    <div className="p-6">
      <Link href="/banner"><h1 className="text-2xl mb-6">Cart</h1></Link>

      {items.length === 0 && <p>No items in cart.</p>}

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg flex items-center gap-6"
          >
            <Image
              src={item.img}
              alt={item.name}
              width={150}
              height={150}
              className="rounded-lg"
            
            />
            <div className="flex-1">
              <p className="text-lg font-bold">{item.name}</p>
              <p>Roll: {item.roll}</p>
           <p>Price per unit: ${item.prise.toFixed(2)}</p>
<p>Quantity: {item.qty}</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(decrement(item.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => dispatch(increment(item.id))}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-gray-700 text-white px-3 py-1 rounded mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

 <div className="mt-6 text-xl font-bold">
  <p>Total Price: ${totalPrice.toFixed(2)}</p>
</div>

    </div>
  );
}
