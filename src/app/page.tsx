import fetchData from "@/services/services";
import React from "react";

export interface User {
  id: number;
  name: string;
  createdAt: string;
  avatar: number;
}

export async function getUsers() {
  const users = await fetchData<User[]>(
    "https://67726481ee76b92dd4922256.mockapi.io/todo"
  );
  if (users) {
    console.log("✅✅" + users);
  }
}

getUsers();

const page = () => {
  return <div className="text-red-600 font-bold">page</div>;
};

export default page;
