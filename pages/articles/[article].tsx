import { GetStaticProps } from "next";
import { useRouter } from "next/router";
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

type IRes = {
  revalidated?: boolean;
  message?: string;
};

export default function Article({ data, article }: IProps & Params) {
  const router = useRouter();

  const handleRevalidate = async () => {
    const res: IRes = await fetch(
      `/api/revalidate${router.asPath}?secret=${process.env.NEXT_PUBLIC_SECRET_TOKEN}`
    ).then((res) => res.json());

    if (res.revalidated) {
      alert("Revalidated");
      router.reload();
      return;
    }

    alert(res.message);
  };

  return (
    <div>
      <p>{article}</p>
      <p>{data.date}</p>
      <a onClick={handleRevalidate} style={{ cursor: "pointer" }}>
        <p>Revalidate</p>
      </a>
    </div>
  );
}
