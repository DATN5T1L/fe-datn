import ArticleAndComments from "@/app/Marketing/Marketing/MarketingArticle/Comments/articleComments";
import { HeaderMarketingArticleComments } from "@/app/Marketing/Marketing/MarketingArticle/Comments/headerArticleComments";


const MarketingPost = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const param = (await params).slug;

  console.log(params);
  return (
    <>
      <HeaderMarketingArticleComments />
      <ArticleAndComments />
    </>
  );
};

export default MarketingPost;
