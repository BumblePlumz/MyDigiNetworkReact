import { FC } from "react";
import { User } from "@/types/user";
import { getAuthorName } from "@/lib/utils";

interface Props {
    author: User,
    text: string,
}

const Comment: FC<Props> = ({author, text}) => {
  return (
    <div className="flex flex-col md:flex-row p-4 border border-blue-500 rounded-lg my-2">
      <p className="me-6 font-semibold text-blue-500">{getAuthorName(author)}</p>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default Comment;
