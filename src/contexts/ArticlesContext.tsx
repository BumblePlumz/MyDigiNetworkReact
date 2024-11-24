import {
  FC,
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  useEffect,
} from "react";
import { Article } from "@/types/article";

interface ArticleContextType {
  articles: Article[];
  setArticles: Dispatch<React.SetStateAction<Article[]>>;
  currentArticle: Article | null;
  setCurrentArticle: Dispatch<React.SetStateAction<Article | null>>;
}

const ArticlesContext = createContext<ArticleContextType | undefined>(
  undefined
);

export const ArticlesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storedArticles = localStorage.getItem("articles");
  const storedCurrentArticle = localStorage.getItem("currentArticle");

  const initialArticles = storedArticles ? JSON.parse(storedArticles) : [];
  const initialCurrentArticle = storedCurrentArticle
    ? JSON.parse(storedCurrentArticle)
    : null;

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(
    initialCurrentArticle
  );

  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem("articles", JSON.stringify(articles));
    } else {
      localStorage.removeItem("articles");
    }

    if (currentArticle) {
      localStorage.setItem("currentArticle", JSON.stringify(currentArticle));
    } else {
      localStorage.removeItem("currentArticle");
    }
  }, [articles, currentArticle]);

  return (
    <ArticlesContext.Provider
      value={{ articles, setArticles, currentArticle, setCurrentArticle }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticlesContext = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error(
      "useArticlesContext must be used within a ArticlesProvider"
    );
  }
  return context;
};
