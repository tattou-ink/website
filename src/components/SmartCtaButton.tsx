import { useEffect, useState } from 'react';

import { m } from '@/paraglide/messages';
import { getDeviceOperatingSystem } from '@/lib/deviceUtils';
import useCtaLink, { getAndroidMailLink } from '@/lib/useCtaLink';
import { Dialog } from 'radix-ui';

import { CtaButton } from './landing/ui';

export function SmartCtaButton({
  label,
  className = '',
  variant,
}: {
  label: string;
  className?: string;
  variant?: 'light' | 'dark';
}) {
  const [ctaHref, setCtaHref] = useState<string>('https://pro.tattou.ink');
  const [isAndroid, setIsAndroid] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { getCtaHref } = useCtaLink();
  useEffect(() => {
    setCtaHref(getCtaHref());
    setIsAndroid(getDeviceOperatingSystem() === 'Android');
  }, [getCtaHref]);

  return (
    <>
      {isAndroid ? (
        <CtaButton
          className={className}
          variant={variant}
          onClick={() => setDialogOpen(true)}
        >
          {label}
        </CtaButton>
      ) : (
        <CtaButton href={ctaHref} className={className} variant={variant}>
          {label}
        </CtaButton>
      )}

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl border border-cream-muted/20 bg-ink p-6 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 lg:p-8">
            <div className="flex flex-col gap-2">
              <Dialog.Title className="font-display text-xl leading-tight font-black text-cream uppercase lg:text-2xl">
                {m.landing_android_dialog_title()}
              </Dialog.Title>
              <Dialog.Description className="font-body text-sm leading-[21px] text-cream-muted">
                {m.landing_android_dialog_body()}
              </Dialog.Description>
            </div>
            <div className="flex flex-col items-start gap-4">
              <CtaButton href="https://pro.tattou.ink">
                {m.landing_android_dialog_web_cta()}
              </CtaButton>
              <Dialog.Close asChild>
                <a
                  href={getAndroidMailLink()}
                  className="font-body text-sm leading-[21px] font-medium text-cream underline uppercase hover:opacity-70"
                >
                  {m.landing_android_dialog_email_cta()}
                </a>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
