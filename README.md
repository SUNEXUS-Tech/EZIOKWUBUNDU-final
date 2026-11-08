# The Triumph of Eziokwubundu I

A frontend-only React experience for the thanksgiving celebration of Jude Ifeanyi Anwukah (Eziokwubundu I).

## Stack
- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide React
- jsPDF for the downloadable keepsake

There is no application server or backend in this repository. The guestbook uses browser `localStorage`, so entries are saved only in the visitor's current browser and are not shared between visitors or devices.

## Project structure
```text
src/
  app/                 Application composition and page shell
  components/          Page sections and interactive UI
  data/                Event details, gallery entries and sample tributes
  lib/                 Browser-side audio and PDF utilities
  styles/              Global Tailwind and site styles
  types.ts             Shared TypeScript interfaces
  main.tsx             Browser entry point
public/
  images/              Production photographs served at /images/*
index.html              Vite document entry point
vite.config.ts          Vite, React and Tailwind configuration
```

## Commands
- `npm install` or `bun install` — install dependencies
- `npm run dev` or `bun run dev` — start the development server
- `npm run typecheck` or `bun run typecheck` — TypeScript check
- `npm run build` or `bun run build` — production build
- `npm run preview` or `bun run preview` — preview the production build
- `npm run clean` or `bun run clean` — remove generated build output

Static images in `public/images/` are referenced by root-relative paths such as `/images/hero.webp`, following Vite's public-directory convention.
