import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

function redirectToTwitter() {
  window.open('https://twitter.com/mallickprat', '_blank');
}

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>govflow 🇺🇸</title>
        <meta name="description" content="Government filings, forms, and follows ups made easy" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/govflow.png" />
      </Head>
      <main
      className="flex min-h-screen items-center justify-center bg-blue-600"
      onClick={redirectToTwitter}
    >
      <img src="/govflow.png" alt="Govflow" className="mx-auto" />
    </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
