import { FC, useState } from "react";
import Comment from "./Comment";
import { Button, Textarea } from "@/components";
import { useArticlesContext } from "@/contexts/ArticlesContext";
import { Comment as CommentProps } from "@/types/comment";
import { Article } from "@/types/article";
import { BASE_URL } from "@/lib/constants";

interface Props {
  comments: CommentProps[];
}

const CommentList: FC<Props> = () => {
  const { currentArticle, setCurrentArticle } = useArticlesContext();
  const comments = currentArticle?.comments || [];
  const [newCommentText, setNewCommentText] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newCommentText.trim()) {
      if (!currentArticle) return;
      const response = await fetch(`${BASE_URL}/comment/${currentArticle.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: newCommentText }),
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data);
        return;
      }
      await hydrateArticle();
      setNewCommentText("");
    }
  };

  const hydrateArticle = async () => {
    const response = await fetch(
      `${BASE_URL}/article/one/${currentArticle?.id}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    const article = data as Article;
    setCurrentArticle(article);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-blue-500">Commentaires</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              author={comment.author}
              text={comment.content}
            />
          ))
        ) : (
          <p className="text-gray-500">Aucun commentaire.</p>
        )}
      {/* Formulaire pour ajouter un commentaire */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700">
          Ajouter un commentaire
        </h4>
        <form onSubmit={handleSubmit} className="mt-2">
          <Textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Écrivez votre commentaire ici..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <Button
            type="submit"
            className="mt-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            Commenter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommentList;
