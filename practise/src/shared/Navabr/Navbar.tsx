"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/components/redux/store/store";

export default function Navbar() {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="bg-green-500 border-2 border-red-500 px-6 py-3 ">
      <nav className="flex justify-between items-center gap-6">
        <Link href="/">
         <h2 className="border-2 border-red-500 px-4 !py-2 cursor-pointer text-red-500 font-bold !bg-black">
  Home
</h2>

        </Link>

        <Link href="/cart">
          <h2 className="cursor-pointer">Cart ({items.length})</h2>
        </Link>
      </nav>
      <div>
       
      </div>
    </div>
  );
}
