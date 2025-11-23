"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/components/redux/features/cartSlice";
import { useRouter } from "next/navigation";

interface UserType {
  id: number;
  name: string;
  roll: string;
  img: string;
  prise: number;
  qty?: number;
}

type UserDetailsProps = {
  params: {
    id: string;
  };
};

const data: UserType[] = [
  { id: 1, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 2, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 3, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
  { id: 4, name: "sujon", roll: "11", img: "/assets/ourUnique.jpg.png", prise: 200 },
];

export default function UserDetails({ params }: UserDetailsProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = data.find((u) => u.id === Number(params.id));
  if (!user) return <p>No user found!</p>;

  const handleAdd = () => {
    dispatch(addToCart({ ...user, qty: 1 }));
    router.push("/cart");
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">User Details</h1>

      <Image src={user.img} alt={user.name} width={300} height={300} />

      <p className="mt-4 text-xl">Name: {user.name}</p>
      <p className="text-lg">Roll: {user.roll}</p>
      <p className="text-lg">ID: {user.id}</p>
      <p>Price: {user.prise}</p>

      <button
        onClick={handleAdd}
        className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
