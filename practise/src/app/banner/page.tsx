"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/components/redux/features/cartSlice";
import { useRouter } from "next/navigation"; // Next.js 13 এর জন্য useRouter

const data = [
  { id: 1, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 2, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 3, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 4, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
];

export default function BannerPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAdd = (item: typeof data[0]) => {
    dispatch(addToCart({ ...item, qty: 1 })); // qty অবশ্যই দিতে হবে
    router.push("/cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 px-[100px] gap-4">
      {data.map((item) => (
        <div key={item.id} className="border p-4 rounded-lg">
          <p>{item.name}</p>
          <p>{item.roll}</p>
          <p>Price: {item.prise}</p>

          <Link href={`/productDetails/${item.id}`}>
            <Image src={item.img} alt={item.name} width={400} height={200} />
          </Link>

          <button
            onClick={() => handleAdd(item)}
            className="bg-green-500 text-white p-2 rounded mt-4"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
