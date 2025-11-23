    // "use client";

    // import React from "react";
    // import { useForm } from "react-hook-form";
    // import { useMutation, useQueryClient } from "@tanstack/react-query";

    // interface FormData {
        
    // name: string;
    // email: string;
    // password: string;
    // }

    // interface Props {
    // initialName: string;
    // initialEmail: string;
    // initialPassword: string;
    // }

    // export default function EditUserForm({ initialName, initialEmail, initialPassword }: Props) {
    // const queryClient = useQueryClient();

    // const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    //     defaultValues: { name: initialName, email: initialEmail, password: initialPassword },
    // });

    // const mutation = useMutation({
    //     mutationFn: async (data: FormData) => {
    //     const response = await fetch('http://localhost:5000/api/users', {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(data),
    //     });
    //     if (!response.ok) throw new Error("Failed to update user");
    //     return response.json();
    //     },
    //     onSuccess: () => {
    //     queryClient.invalidateQueries(["user"]);
    //     alert("User updated successfully!");
    //     },
    //     onError: (error: any) => {
    //     alert(error.message || "Update failed");
    //     },
    // });

    // const onSubmit = (data: FormData) => {
    //     mutation.mutate(data);
    // };

    // return (
    //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4 border rounded">
    //     <div>
    //         <label className="block font-semibold mb-1">Name</label>
    //         <input
    //         {...register("name", { required: "Name is required" })}
    //         className={`w-full border p-2 rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
    //         type="text"
    //         />
    //         {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
    //     </div>

    //     <div>
    //         <label className="block font-semibold mb-1">Email</label>
    //         <input
    //         {...register("email", { 
    //             required: "Email is required",
    //             pattern: {
    //             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //             message: "Invalid email address",
    //             }
    //         })}
    //         className={`w-full border p-2 rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
    //         type="email"
    //         />
    //         {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
    //     </div>

    //     <div>
    //         <label className="block font-semibold mb-1">Password</label>
    //         <input
    //         {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
    //         className={`w-full border p-2 rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
    //         type="password"
    //         />
    //         {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
    //     </div>

    //     <button
    //         type="submit"
    //         disabled={mutation.isLoading || isSubmitting}
    //         className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
    //     >
    //         {mutation.isLoading ? "Updating..." : "Update"}
    //     </button>
    //     </form>
    // );
    // }

    
"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import EditUserForms from "../modal/page";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:5000/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

async function updateUser(user: User): Promise<User> {
  const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}
async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
}


export default function EditUserForm() {
 const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

const mutation = useMutation<User, Error, User>({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] }); 
    alert("User updated successfully!");
    setOpenModal(false);
    setSelectedUser(null);
  },
  onError: (error: Error) => {
    alert(error.message || "Update failed");
  },
});



  const handleUpdate = (name: string, email: string, password: string) => {
    if (!selectedUser) return;
    mutation.mutate({
      id: selectedUser.id,
      name,
      email,
      password,
    });
  };

  const deleteMutation = useMutation({
  mutationFn: deleteUser,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey:["users"]});
    alert("User deleted successfully!");
  },
  onError: (error: Error) => {
    alert(error.message || "Update failed");
  },
});


  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Password</th>
            <th className="border border-gray-300 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.password}</td>
              <td className="border border-gray-300 p-2 flex justify-between">
                <button
                  className="text-blue-600 underline"
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenModal(true);
                  }}
                >
                  Edit
                </button>
            <button
  className="text-red-600 underline"
  onClick={() => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteMutation.mutate(user.id);
    }
  }}
>
  Delete
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[50%] relative">
            <button
              onClick={() => {
                setOpenModal(false);
                setSelectedUser(null);
              }}
              className="absolute top-2 right-3 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>

  <EditUserForms
  initialName={selectedUser.name}
  initialEmail={selectedUser.email}
  initialPassword={selectedUser.password}
  isLoading={mutation.isPending}  // isLoading or isMutating নেই, isPending ব্যবহার করো
  onSubmit={handleUpdate}
/>

          </div>
        </div>
      )}
    </div>
  );
}
