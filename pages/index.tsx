import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

type IProps = {
  data: {
    name: string;
    date: number;
  };
};

type IRes = {
  revalidated?: boolean;
  message?: string;
};

export const getStaticProps = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API}/hello`).then((res) =>
    res.json()
  );
  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
};

const Home: NextPage<IProps> = ({ data: { name, date } }) => {
  const router = useRouter();

  const handleRevalidate = async () => {
    const res: IRes = await fetch(
      `/api/revalidate?secret=${process.env.NEXT_PUBLIC_SECRET_TOKEN}`
    ).then((res) => res.json());

    if (res.revalidated) {
      alert("Revalidated");
      router.reload();
      return;
    }

    alert(res.message);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js 12.1 On-Demand ISR</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          {name} <code className={styles.code}>{date}</code>
        </p>

        <div className={styles.grid}>
          <a onClick={handleRevalidate} className={styles.card}>
            <p>Revalidate</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
