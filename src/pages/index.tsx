import Head from "next/head";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function Home() {
  return (
    <>
      <Head>
        <title>Moiré</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen text-center lg:text-start overflow-x-hidden flex flex-col justify-between bg-[#181818]">
        <div className="pt-24 px-24 w-4/5 space-y-4">
          <div className="font-heading">
            <h1 className="text-4xl font-bold text-neutral-300">Moiré</h1>
            <p className="text-xl font-semibold  text-neutral-500">
              Math visualized
            </p>
          </div>
          <ul className="text-neutral-300 text-lg underline pb-8">
            <li className="flex items-center">
              <Link href="/sim/parabola" target="_blank">
                Exploring the parabola
              </Link>{" "}
              <FiArrowUpRight />
            </li>
          </ul>

          <Link
            href="https://github.com/shhivv/math"
            className="text-neutral-500 text-lg underline"
          >
            Github
          </Link>
          {/* <VectorField/> */}
        </div>
      </main>
    </>
  );
}
