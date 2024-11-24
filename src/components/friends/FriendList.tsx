import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import FriendCard from "./FriendCard";
import { Subscription } from "@/types/subscription";

interface FriendListProps {
    subscriptions: Subscription[];
}

const FriendList: FC<FriendListProps> = ({ subscriptions }) => {
    const articles = useLoaderData();
    console.log('articles', articles);
  return (
    <>
        <h1>Hey ! ça ne fonctionne pas encore &lsaquo3 merci pour votre patience</h1>
      {subscriptions?.length > 0 ? (
        <div className="flex flex-row flex-wrap justify-center gap-3 md:flex-nowrap">
          {subscriptions.map((item) => (
            <FriendCard key={item.friend.id} friend={item.friend} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucun ami trouvé</p>
      )}
    </>
  );
};

export default FriendList;
