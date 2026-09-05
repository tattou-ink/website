---
name: write-blog-article
description: Write a new SEO blog article for the tattou.ink website that helps tattoo artists and naturally introduces the product at the end. Use when asked to write, draft, or add a blog article/post for the site, or to edit an existing article's tone, wiring, or tattou.ink call-to-action.
---

# Write a tattou.ink blog article

These articles are SEO content. Their job: a tattoo artist searches a real problem, finds genuinely useful advice here, and by the end asks "what is tattou.ink?". Help first, sell second.

## Audience & goal

- **Readers:** working tattoo artists, not businesspeople. Write to someone who'd rather be tattooing than doing admin.
- **The pain we solve:** artists lose hours to admin — sending invites, replying to the same customer questions, moving sessions around, planning guest spots, collecting client information, trying to retrieve info in Instagram DMs or emails or whatsapp messages, updating forms, taking flash tattoos off Instagram once they've been tattooed.
- **Every article funnels to that pain**, then introduces tattou.ink as the fix.

## Voice & style

- **American English throughout** (color, gray, organize, customize, traveling, anesthetic — not colour, grey, organise, travelling, anaesthetic).
- Direct, warm, practical. Short paragraphs. Concrete scenarios over abstract advice.
- Use `##`/`###` headings, bulleted lists, and an occasional `>` blockquote for emphasis — it's scannable and good for SEO.
- Open with a relatable scene the artist has lived, not a definition.
- Where it fits, give the reader something copy-pasteable (a template, checklist, script). That earns the bookmark/share.

## Article structure

1. **Title** — phrased as the question or task an artist would actually search ("What Should I Ask My Customers Before a Tattoo Session?").
2. **Hook** — a familiar painful scenario or a common issue that tattoo artists face ; then the promise of what the article delivers.
3. **Body** — the actual helpful content, grouped under clear headings.
4. **A practical takeaway** (optional) — template/checklist/script the reader can use today.
5. **"The bottom line"** — short recap that reframes the problem as one of _workflow_, not effort.
6. **tattou.ink call-to-action** — see below.

## Naming

The app is called **tattou.ink** (all lowercase) — never "Tattou", "Tattou.ink", or "TattouInk". Link it: `[tattou.ink](https://tattou.ink)`. It's available two ways: a **mobile app** and a web app at **pro.tattou.ink**.

## The tattou.ink call-to-action (always last)

Separate it with a `---` and an enthusiastic `###` heading tied to the article's theme. Lead with the feature most relevant to the article, then a soft link. Pick the facts that fit — **don't dump the whole list, focus on 1 or 2, 3 at most.**

Product facts to draw on::

- **One place for all client admin** — replaces the scatter of Instagram DMs, email, texts, and spreadsheets.
- **Free-form form builder** — artists _create forms freely_ and shape them to their own style/voice/vibe; add or drop any field.
  - Default collected fields on every form: **client name**, **skin tone**, **whether it's their first tattoo** and their **billing address**.
  - Whether it's a **flash tattoo project** or a **custom project**, it also collects the **placement and size of each desired tattoo**.
- **Integrated chat** — talk to clients inside the app instead of digging through Instagram DMs. The chat also surfaces session events inline: reschedules, reminders, and payment requests. PNG and JPEG images and PDF files can be sent through the chat.
- **Calendar for the artist** — shows all tattoo sessions in one view; connects to Google Calendar so it won't double-book against your other meetings. Sessions can be in different parlors/studios anywhere in the world, with timezone handling built in (useful for guest spots and travel). Built for both regular work weeks and irregular schedules.
- **Last minute absence management** - If artists have an emergency and can't make a session, they can send a cancellation notice to all the clients booked that day.
- **Your own booking website** — published on a tattou.ink subdomain with a slug the artist chooses. It shows the artist's flash books so clients can book directly, has a **tag system** for discovery, and supports **from 1 to 20 configurable price ranges** assigned to designs so clients get a sense of cost up front.
- **Payment tracking** — connect Stripe to generate payment links that tattou.ink tracks automatically, or log payments made by other means (cash, Wero, Vipps, PayPal, Wise, Lydia, etc.).
- **Safe and secure** — all your customer data is encrypted in transit and sensitive data is encrypted at rest. tattou.ink is GDPR-compliant and hosted in the EU.
- **Cross-platform** — works on iOS, Android, and desktop browsers. No loss if your device dies mid-session; log in from another device and pick up where you left off.
- **Built to travel** - the booking website is translated into 11 languages (da es it pt de fi nl sv en fr no) and tattoo artists can use 10 currencies (EUR USD CAD AUD NZD GBP NOK SEK DKK CHF).

The closing line should show how tattou.ink has been designed to ease the tattoo artist's experience when it comes to admin and organization tasks. The article always ends with a CTA as declared in the Metadata.

## Wiring a NEW article into the site (4 steps)

A blog article is not just the markdown — it must be registered or it 404s. Use an existing slug as the model, e.g. `what-to-ask-customers-before-tattoo-session`.

1. **Markdown** — create `src/static/blog/<slug>.md` with yaml data for frontmatter with a structure matching this Typescript type:

    ```ts
    {
      title: string; // Searchable question/title
      description: string: // ~1 sentence meta description for SEO
      published: string; // (Date YYYY-MM-DD, use today's date)
      author: 'tattou.ink';
      category: 'Clients' | 'Business' | 'Studio' | 'Organization'; // To be translated in the target language
      heroImage: string; // Path to image such as /images/blog/what-to-ask-customers-before-tattoo-session.jpg
      cta: {
        type: 'app';
        label: string; // To be translated in the target language
      } | {
        type: 'path';
        path: '/';
        anchor: string;
      };
      tags: Array<string>; // Such as tattoo business, client intake, studio workflow,consultation, etc. Anything business related relevant to the article.
    }
    ```

2. **Route** — create `src/routes/blog/<slug>.tsx`. Copy an existing blog article code and change only the route path string in `createFileRoute('/blog/<slug>')`. The component, loader, and `getBlogArticleMarkdownOrThrowNotFound` call stay identical.
3. **i18n registration** — add an entry to `localizedPathNames` in `i18n/lib.ts` with `en` and `fr` slugs (translate the slug for `fr`). Without this entry the loader throws `notFound()`:
   ```ts
   '/blog/<slug>': {
     en: '/blog/<slug>',
     fr: '/blog/<french-slug>',
   },
   ```
4. **Route tree** — `src/routeTree.gen.ts` is auto-generated by TanStack Router. It regenerates on dev/build; don't hand-edit it. After adding the route file, run the dev server or build once so it picks up the new route, then verify the file changed.

`<slug>` must match across all three files (the `.md` filename, the `.tsx` route path, and the `en` path in `i18n/lib.ts`).

## Checklist before finishing

- [ ] American English, no British spellings (grep: `colour|grey|realise|organis|customis|travelling|anaesthetic`).
- [ ] Helpful content stands on its own; the product pitch is only at the end.
- [ ] Closing CTA leads with a relevant feature.
- [ ] For a new article: `.md`, `.tsx` route, and `i18n/lib.ts` entry all added with matching slug.
- [ ] `published` date is today's date.
