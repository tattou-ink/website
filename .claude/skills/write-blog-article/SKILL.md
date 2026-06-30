---
name: write-blog-article
description: Write a new SEO blog article for the tattou.ink website that helps tattoo artists and naturally introduces the product at the end. Use when asked to write, draft, or add a blog article/post for the site, or to edit an existing article's tone, wiring, or tattou.ink call-to-action.
---

# Write a tattou.ink blog article

These articles are SEO content. Their job: a tattoo artist searches a real problem, finds genuinely useful advice here, and by the end asks "what is tattou.ink?". Help first, sell second.

## Audience & goal

- **Readers:** working tattoo artists, not businesspeople. Write to someone who'd rather be tattooing than doing admin.
- **The pain we solve:** artists lose hours to admin — sending invites, replying to the same customer questions, moving sessions around, planning guest spots, collecting client information.
- **Every article funnels to that pain**, then introduces tattou.ink as the fix.

## Voice & style

- **American English throughout** (color, gray, organize, customize, traveling, anesthetic — not colour, grey, organise, travelling, anaesthetic).
- Direct, warm, practical. Short paragraphs. Concrete scenarios over abstract advice.
- Use `##`/`###` headings, bulleted lists, and an occasional `>` blockquote for emphasis — it's scannable and good for SEO.
- Open with a relatable scene the artist has lived, not a definition.
- Where it fits, give the reader something copy-pasteable (a template, checklist, script). That earns the bookmark/share.

## Article structure

1. **Title** — phrased as the question or task an artist would actually search ("What Should I Ask My Customers Before a Tattoo Session?").
2. **Hook** — a familiar painful scenario, then the promise of what the article delivers.
3. **Body** — the actual helpful content, grouped under clear headings.
4. **A practical takeaway** — template/checklist/script the reader can use today.
5. **"The bottom line"** — short recap that reframes the problem as one of *workflow*, not effort.
6. **tattou.ink call-to-action** — see below.

## Naming

The app is called **tattou.ink** (all lowercase) — never "Tattou", "Tattou.ink", or "TattouInk". Link it: `[tattou.ink](https://tattou.ink)`. It's available two ways: a **mobile app** and a web app at **pro.tattou.ink**.

## The tattou.ink call-to-action (always last)

Separate it with a `---` and an enthusiastic `###` heading tied to the article's theme. Lead with the feature most relevant to the article, then a soft link. Pick the facts that fit — **don't dump the whole list.**

Product facts to draw on:

- **One place for all client admin** — replaces the scatter of Instagram DMs, email, texts, and spreadsheets.
- **Free-form form builder** — artists *create forms freely* and shape them to their own style/voice/vibe; add or drop any field.
  - Default collected fields on every form: **client name**, **skin tone**, and **whether it's their first tattoo**.
  - For **flash tattoo projects**, it also collects the **placement and size of each desired tattoo**.
- **Integrated chat** — talk to clients inside the app instead of digging through Instagram DMs. The chat also surfaces session events inline: reschedules, reminders, and payment requests.
- **Calendar for the artist** — shows all tattoo sessions in one view; connects to Google Calendar so it won't double-book against your other meetings. Sessions can be in different parlors/studios anywhere in the world, with timezone handling built in (useful for guest spots and travel).
- **Your own booking website** — published on a tattou.ink subdomain with a slug the artist chooses. It shows the artist's flash books so clients can book directly, has a **tag system** for discovery, and supports **3 configurable price ranges** assigned to designs so clients get a sense of cost up front.
- **Payment tracking** — connect Stripe to generate payment links that tattou.ink tracks automatically, or log payments made by other means (cash, Wero, Vipps, PayPal, Wise, Lydia, etc.).

The closing line should name the admin pains the article touched (invites, repeat questions, rescheduling, collecting info) and end with a plain link to [tattou.ink](https://tattou.ink).

## Wiring a NEW article into the site (4 steps)

A blog article is not just the markdown — it must be registered or it 404s. Use an existing slug as the model, e.g. `what-to-ask-customers-before-tattoo-session`.

1. **Markdown** — create `src/static/blog/<slug>.md` with this frontmatter:
   ```yaml
   ---
   title: "<Searchable question/title>"
   description: "<~1 sentence meta description for SEO>"
   published: <YYYY-MM-DD>   # use today's date
   author: tattou.ink
   tags:
     - tattoo business
     - <other relevant tags>
   ---
   ```
2. **Route** — create `src/routes/blog/<slug>.tsx`. Copy an existing blog route verbatim and change only the route path string in `createFileRoute('/blog/<slug>')`. The component, loader, and `getBlogArticleMarkdownOrThrowNotFound` call stay identical.
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
- [ ] Closing CTA leads with a relevant feature and links to tattou.ink.
- [ ] For a new article: `.md`, `.tsx` route, and `i18n/lib.ts` entry all added with matching slug.
- [ ] `published` date is today's date.
