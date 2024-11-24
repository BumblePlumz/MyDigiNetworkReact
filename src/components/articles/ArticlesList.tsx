import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleCard } from "@/components";
import { useArticlesContext } from "@/contexts/ArticlesContext";
import { Article } from "@/types/article";


interface ArticleListProps {
    listTitle: string;
}

const ArticlesList: React.FC<ArticleListProps> = ({ listTitle }) => {
    const navigate = useNavigate();
    const { articles, currentArticle, setCurrentArticle } = useArticlesContext();

    const handleArticleClick = (articleId: number) => {
        const clickedArticle = articles.find((article) => parseInt(article.id) === articleId) as Article;
        setCurrentArticle(clickedArticle);
        navigate(`/articles/${articleId}`, { state: { article: currentArticle } });
    };

    return (
        <div>
            <h1 className="text-center bold text-4xl my-6">{listTitle}</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {articles.length === 0 ? (
                    <p>Aucun article disponible.</p>
                ) : (
                    articles.map((article) => (
                        <li key={article.id} className="article-item" onClick={() => handleArticleClick(parseInt(article.id))}>
                            <ArticleCard article={article} maxLength={50} />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ArticlesList;
