import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { m } from '@/paraglide/messages';

import type { Locale } from '@/paraglide/runtime';
import { getLocale, localizeHref, setLocale } from '@/paraglide/runtime';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Languages } from 'lucide-react';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const locale = getLocale();
  return (
    <div className="flex h-screen flex-col p-4 md:p-8 lg:px-16">
      <header className="flex flex-row justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Languages />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuRadioGroup
              value={locale}
              onValueChange={(newLanguage: string) => {
                setLocale(newLanguage as Locale);
              }}
            >
              <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex flex-1 items-center justify-center bg-white">
        <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-10">
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
      <footer>
        <Link to={localizeHref('/privacy-policy', {locale: undefined})}>
          {m.smart_tidy_okapi_spark()}
        </Link>
      </footer>
    </div>
  );
}
