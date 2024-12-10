'use client'

import HeaderEditMarketingPost from "../../Marketing/MarketingArticle/Add/headerEditPost";
import EditMarketingPost from "../../Marketing/MarketingArticle/Add/editPost";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPost: React.FC = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);


  useEffect(() => {
    const paramId = searchParams.get("id");
    setId(paramId);
  }, [searchParams]);
  return (
    <>
      <HeaderEditMarketingPost />
      {id && (
        <EditMarketingPost id={`${id}`} />
      )}
    </>
  );
};

export default EditPost;
