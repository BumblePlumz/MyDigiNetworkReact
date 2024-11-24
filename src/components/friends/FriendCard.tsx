import { FC } from "react";
import { User } from "@/types/user";
import { getAuthorName } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, Button } from "@/components";

interface FriendCardProps {
  friend: User;
}

const FriendCard: FC<FriendCardProps> = ({ friend }) => {
  const onDelete = async (e: any, id: number) => {
    e.preventDefault();
    console.log(`Deleting friend with id ${id}`);
    const response = await fetch(`http://localhost:3000/friends/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    console.log("Friend deleted successfully");
  };

  return (
    <Card className="w-full max-w-xs shadow-lg border rounded-lg">
      <CardHeader>
        <h2 className="font-bold text-lg">{getAuthorName(friend)}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{friend.email}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={(e) => onDelete(e, parseInt(friend.id))}
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FriendCard;
