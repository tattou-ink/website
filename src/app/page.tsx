import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-10 px-4 md:px-12 ">
        <Image
          className=""
          src="/tattou-wip.gif"
          alt="Work In Progress Tattou.ink"
          width={300}
          height={87}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-[5] text-black">
            WIP
          </h1>
        </div>
      </main>
    </div>
  );
}
