# Techifly News

An Arabic-first news site built with **React + Vite**. Articles come from public Arabic RSS feeds —
**no API key, no backend, no database, and no hardcoded article content**.

## Stack

React · React Router · Vite · plain CSS. Nothing else.

## Routes

| Route | Page |
| --- | --- |
| `/` | `HomePage` — hero, أحدث الأخبار, and a block per category |
| `/latest` | `LatestNewsPage` |
| `/category/:slug` | `CategoryPage` |
| `*` | `NotFoundPage` |

Internal navigation uses `<Link>` / `<NavLink>`; article links are plain `<a target="_blank">` to
the original publisher.

## Data source

Each section maps to a real per-section Arabic RSS feed:

| Section | Source | Feed |
| --- | --- | --- |
| رياضة | RT Arabic | `arabic.rt.com/rss/sport/` |
| سياسة | CNN Arabic | `arabic.cnn.com/api/v1/rss/middle-east/rss.xml` |
| اقتصاد | RT Arabic | `arabic.rt.com/rss/business/` |
| تكنولوجيا | RT Arabic | `arabic.rt.com/rss/technology/` |
| صحة | RT Arabic | `arabic.rt.com/rss/health/` |
| فن | RT Arabic | `arabic.rt.com/rss/culture/` |
| العالم | RT Arabic | `arabic.rt.com/rss/world/` |

Publisher feeds do not send CORS headers, so they are read through
[rss2json](https://rss2json.com/), a keyless converter that responds with
`Access-Control-Allow-Origin: *`. It returns 10 items per feed.

**أحدث الأخبار** is not a separate request: it merges the section feeds already fetched and sorts
them by publication time. A homepage load costs **7 requests total**. Responses are cached in
`sessionStorage` for 10 minutes and concurrent identical requests share one promise — which also
absorbs the double effect React StrictMode runs in development.

## Architecture

```
RSS feeds → services/api.js → services/news.js → hooks → pages → components
```

Components never build URLs or call `fetch` directly.

## Article model

```js
{ title, description, image, url, category, published, author }
```

`description` is stripped of markup and truncated; `image` comes from the item's `thumbnail` or
`enclosure`, falling back to the site logo when absent or when the remote image fails to load;
`published` is parsed as UTC and shown as Arabic relative time ("منذ ساعتين") or an absolute date.
Articles are de-duplicated by URL, which is also the React key.

## Running

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # static build into dist/
npm run preview  # serve the contents of dist/
```

## Structure

```
index.html                    single HTML entry
src/
  main.jsx                    createRoot + BrowserRouter + StrictMode
  App.jsx                     header, routes, footer
  components/
    Header.jsx  Navbar.jsx  Footer.jsx
    NewsCard.jsx              one card, variants: default | feature | compact
    HeroSection.jsx  CategorySection.jsx  SectionHead.jsx
    LoadingSkeleton.jsx  ErrorState.jsx  EmptyState.jsx
  pages/
    HomePage.jsx  LatestNewsPage.jsx  CategoryPage.jsx  NotFoundPage.jsx
  hooks/
    useNews.js                useNews + useLatestNews
    useCategoryNews.js
  services/
    api.js                    transport, caching, error type
    news.js                   normalisation, de-duplication, merging
  data/
    categories.js  site.js
  utils/
    formatDate.js  imageFallback.js
  styles/index.css            design tokens + all styling
  assets/techifly-logo.png
```

Fonts are loaded from Google Fonts (Cairo for headings, IBM Plex Sans Arabic for text) with a
system Arabic fallback stack.
