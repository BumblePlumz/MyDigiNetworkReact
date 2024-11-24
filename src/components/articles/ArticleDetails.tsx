import { FC, useEffect, useState } from "react";
import CommentList from "@/components/comments/CommentList";
import { Comment } from "@/types/comment";
import { useArticlesContext } from "@/contexts/ArticlesContext";
import ArticleCard from "./ArticleCard";

interface ArticleDetailsProps {}

const ArticleDetails: FC<ArticleDetailsProps> = () => {
  const { currentArticle } = useArticlesContext();
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    if (!currentArticle) return;
    setComments(currentArticle?.comments);
  }, [currentArticle]);

  useEffect(() => {
    if (!currentArticle) return;
    const { firstname, lastname } = currentArticle.author || {};
    if (!firstname && !lastname) {
      setAuthor("anonyme");
    } else {
      setAuthor(`${firstname || ""} ${lastname || ""}`.trim());
    }
  }, [author]);

  return (
    <div className="max-w-3xl mx-auto p-6 border border-blue-500 rounded-lg shadow-md">
      <ArticleCard article={currentArticle!} />
      <CommentList comments={comments || []} />
    </div>
  );
};

export default ArticleDetails;
