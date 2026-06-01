import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-10 px-4 md:px-12">
        <img
          className=""
          src="/tattou-wip.gif"
          alt="Work In Progress tattou.ink"
          width={300}
          height={87}
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-[5px] text-black">
            WIP
          </h1>
        </div>
      </main>
    </div>
  );
}
