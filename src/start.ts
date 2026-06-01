import { createCsrfMiddleware, createStart } from '@tanstack/react-start';

export type RequestData =
  | { feature: 'auth'; proSlug: null }
  | { feature: 'chat'; proSlug: null }
  | { feature: 'pay'; proSlug: null }
  | { feature: 'client'; proSlug: string };

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
});

export const startInstance = createStart(() => {
  return { requestMiddleware: [csrfMiddleware] };
});
