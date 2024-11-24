import { FC } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components";
import { Button } from "../ui/button";
import { Article } from "@/types/article";
import { cn, getAuthorName } from "@/lib/utils";
import { getAuthToken, getId } from "@/lib/auth";
import { BASE_URL } from "@/lib/constants";

interface MouseEvent extends React.MouseEvent<HTMLButtonElement> {}
interface ArticleCardProps {
  article: Article;
  maxLength?: number;
}

const ArticleCard: FC<ArticleCardProps> = ({
  article,
  maxLength = undefined,
}) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const userID = getId();
  const commentsCount = article.comments?.length || 0;
  console.log("article", article);

  function onDelete(e: MouseEvent) {
    e.stopPropagation();
    const proceed = confirm("Voulez-vous vraiment supprimer cet article ?");
    if (proceed) {
      submit(null, {
        action: `/articles/${article.id}/delete`,
        method: "DELETE",
      });
    }
  }

  function onEdit(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/articles/${article.id}`, { state: { article } });
  }

  async function onSubscribe(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const response = await fetch(`${BASE_URL}/subscription/${article.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({ targetID: article.author.id }),
    });
    if (!response.ok) {
      alert("Une erreur s'est produite lors de la souscription");
    }
  }

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <Card className="border border-blue-500 flex flex-col justify-around my-4 p-4 border rounded-lg shadow-lg text-center min-h-[325px]">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{article.title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Par {getAuthorName(article.author)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-gray-700">
          {" "}
          {maxLength
            ? truncateText(article.content, maxLength)
            : article.content}
        </p>
      </CardContent>
      <CardFooter className={cn("flex flex-col")}>
        <div className="text-sm text-gray-500">
          {commentsCount} {commentsCount === 1 ? "commentaire" : "commentaires"}
        </div>
        <menu className="flex flex-col md:flex-row justify-center mt-4 flex space-x-2">
          {article.author.id !== userID && (
            <Button
              className={cn(
                "border bg-white border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer"
              )}
              onClick={(e) => onSubscribe(e)}
            >
              S'abonner
            </Button>
          )}
          {article.author.id === userID && (
            <>
              <Button
                className={cn(
                  "bg-blue-600 text-white hover:bg-white hover:border hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                )}
                onClick={(e) => onDelete(e)}
              >
                Supprimer
              </Button>
              <Button
                className={cn(
                  "bg-white border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer"
                )}
                onClick={(e) => onEdit(e)}
              >
                Éditer
              </Button>
            </>
          )}
        </menu>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
