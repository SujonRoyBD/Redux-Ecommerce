"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/components/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import EditUser from "../(client)/apiTable/page";
import EditUserForms from "../(client)/apiTable/page";

const data = [
  { id: 1, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 2, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 3, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 4, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
];

export default function BannerPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const handleAdd = (item: typeof data[0]) => {
    dispatch(addToCart({ ...item, qty: 1 }));
    router.push("/cart");
  };

  const handleUpdate = (name: string, email: string, password: string) => {
    console.log("Updated:", name, email, password);
    setOpenModal(false);
  };

  return (
    <>
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

        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-500 p-2 text-white rounded"
          >
            Edit
          </button>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[50%] relative">

            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              ×
            </button>

            <EditUserForms
              initialName="Sujon"
              initialEmail="demo@gmail.com"
              initialPassword="123456"
              isLoading={false}
              onSubmit={handleUpdate}
            />
          </div>
         
        </div>

         
      )}
      <div>
            <EditUser/>
          </div>
    </>
  );
}
