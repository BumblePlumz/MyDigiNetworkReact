import { FC } from "react";
import { json, useLoaderData } from "react-router-dom";
import { FriendList } from "@/components";
import { BASE_URL } from "@/lib/constants";
import { getAuthToken } from "@/lib/auth";
import { Subscription } from "@/types/subscription";

const FriendsPage: FC = () => {
  const friendsData = useLoaderData() as Subscription[];
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className=" text-2xl font-bold mb-4">Liste de vos amis</h1>
      <FriendList subscriptions={friendsData} />
    </div>
  );
};

export default FriendsPage;

export async function friendLoaderAll(): Promise<Response> {
  const response = await fetch(`${BASE_URL}/subscription`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) throw new Error("An error occurred while fetching friends");
  const data: Subscription[] = await response.json();
  return json(data);
}
