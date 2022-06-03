import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

type IProps = {
  data: {
    name: string;
    date: number;
  };
};

interface Params extends ParsedUrlQuery {
  article: string;
}

export const getStaticProps: GetStaticProps<IProps, Params> = async ({
  params,
}) => {
  const article = params?.article;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API}/hello`).then((res) =>
    res.json()
  );
  return {
    props: {
      data,
      article,
    },
  };
};

export async function getStaticPaths() {
  const articles = ["article-1", "article-2", "article-3"];

  const paths = articles.map((article) => ({
    params: {
      article,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Article({ data, article }: IProps & Params) {
  return (
    <div>
      <p>{article}</p>
      <p>{data.date}</p>
    </div>
  );
}
