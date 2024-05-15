import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Hero from "./components/Hero/Hero";
import Nav from "./components/Nav/Nav";
import Services from "./components/Services/Services";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Create - Full Stack Product - Julien Leske</title>
        <meta
          name="description"
          content="Create digital Products from idea to launch"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Hero />
      <Services />
    </main>
  );
}
