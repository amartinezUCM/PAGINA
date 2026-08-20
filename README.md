# UCM — Unión de Crédito Mexicano

Marketing site for UCM (Unión de Crédito Mexicano). All user-facing copy is in Spanish.

**Stack**: [Astro 6](https://astro.build) + React 19 + Tailwind CSS v4 (via `@tailwindcss/vite`). Static output (`output: 'static'`), currently deployed to Vercel through the `@astrojs/vercel` adapter.

## Requirements

- Node.js >= 22.12
- [pnpm](https://pnpm.io)

## Commands

All commands run from the project root:

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build the production site to `./dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro check` | TypeScript type-check |

There is no test suite or linter configured.

## Project structure

```text
src/
├── pages/            # File-based routes (one .astro file per route)
├── layouts/
│   └── Layout.astro  # Global shell: Header, Footer, SEO meta, fonts, modals
├── components/
│   ├── sections/     # Reusable full-width blocks: PageHero, CTABanner, BlockImageText
│   ├── ui/           # Atoms: SectionHeading, SectionLabel
│   ├── modals/       # Lead-capture form modals (FormModal shell + concrete modals)
│   └── …             # Page-section components
└── styles/
    └── global.css    # All design tokens (@theme) and utility classes
public/               # Static assets (images, favicons)
```

**Routes**: `/`, `/soluciones`, `/nosotros`, `/se-parte`, `/mundial`, `/informacion-financiera`, `/legales`.

**Component split**: static sections are `.astro` components; interactive/animated sections are `.tsx` React components hydrated with `client:load` or `client:visible`.

**Modal system**: `FormModal.astro` is the generic shell (backdrop, panel, close logic). Concrete modals (`ModalInversiones`, `ModalArrendamiento`, `ModalCreditoEmpresarial`, `ModalAsesoriaPersonal`, `ModalMundial`) are mounted once in `Layout.astro`, so they are available on every page. Any element opens one via `data-open-modal="modal-id"`; closing is handled by `data-modal-close`, backdrop click, or Escape.

**Styling**: all custom tokens live in `src/styles/global.css` inside the `@theme {}` block (brand red `#980025`, gold `#CEA24A`, dark `#0A0B1E`; Poppins sans / Baskervville serif). Utility classes such as `.container-ucm`, `.section-*`, `.btn-*`, `.eyebrow`, `.card`, `.mf-*` (modal forms), and the `.reveal-*` scroll-reveal classes are defined in `@layer utilities` of the same file.

**Path aliases** (`tsconfig.json`): `@/*` → `src/*`, plus `@/components/*`, `@/layouts/*`, `@/assets/*`, `@/styles/*`.

### Additional notes

- **Layout shell**: `src/layouts/Layout.astro` accepts optional `title`, `description`, and `image` props for per-page SEO/OG meta tags; sensible site-wide defaults apply when omitted.
- **Adding a new modal**: create the component in `src/components/modals/` wrapping `<FormModal id="modal-...">`, import and mount it in `Layout.astro`, then give any trigger element the matching `data-open-modal` attribute.
- **Decorative headings**: mixed Poppins/Baskervville headings go through `SectionHeading.astro`; italic serif words inside a heading use the `.serif-italic` class. `SectionLabel.astro` renders the small uppercase label above headings (`.eyebrow`, with `--gold` and `--muted` variants).
- **Scroll reveals**: `.reveal-up` / `.reveal-left` / `.reveal-right` elements are animated by `IntersectionObserver` code in per-page `<script>` blocks — a new page using these classes needs that script too.
- **Page-specific styles**: BEM-style class families for individual pages also live in `global.css` rather than component `<style>` blocks (e.g. `.fin-*` for informacion-financiera, `.leg-*` for legales, `.promo-rates-*`, `.opc-*`). Card variants include `.card` / `.card-dark` and `.pricing-card` / `.pricing-card--featured`.

## Deployment

The site builds to plain static files in `./dist/`, so it can be hosted anywhere that serves static content. The `@astrojs/vercel` adapter only takes effect on Vercel — it does not interfere with other hosts.

### Vercel (current setup)

The repo is already configured for Vercel via `@astrojs/vercel` in `astro.config.mjs`.

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com), **Add New → Project** and import the repo. Vercel auto-detects Astro; no settings need changing.
3. Every push to `main` triggers a production deploy; other branches get preview deploys.

Or deploy from the CLI:

```sh
pnpm dlx vercel        # preview deploy
pnpm dlx vercel --prod # production deploy
```

### Netlify

No adapter change is required for a static deploy. Either connect the repo in the Netlify dashboard (**Add new site → Import an existing project**) with:

- **Build command**: `pnpm build`
- **Publish directory**: `dist`

or commit a `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22.12.0"
```

Then push — Netlify builds and deploys on every push to the connected branch.

### DigitalOcean

**Option A — App Platform (managed, simplest)**

1. In DigitalOcean, **Create → App** and connect the repo.
2. Choose the **Static Site** resource type with:
   - Build command: `pnpm install && pnpm build`
   - Output directory: `dist`
3. Deploys run automatically on push. Static sites on App Platform are free within the starter tier limits.

**Option B — Droplet (self-managed Ubuntu server with nginx)**

1. Create an Ubuntu droplet and SSH in, then install nginx, Node 22, and pnpm:

   ```sh
   sudo apt update && sudo apt install -y nginx git curl
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm install -g pnpm
   ```

2. Clone and build:

   ```sh
   git clone <repo-url> ~/ucm
   cd ~/ucm
   pnpm install
   pnpm build
   ```

3. Publish the build and point nginx at it:

   ```sh
   sudo mkdir -p /var/www/ucm
   sudo rsync -a --delete dist/ /var/www/ucm/
   ```

   Create `/etc/nginx/sites-available/ucm`:

   ```nginx
   server {
       listen 80;
       server_name example.com www.example.com;

       root /var/www/ucm;
       index index.html;

       location / {
           try_files $uri $uri/index.html =404;
       }

       # Long-lived cache for hashed build assets
       location /_astro/ {
           add_header Cache-Control "public, max-age=31536000, immutable";
       }
   }
   ```

   Enable it and reload:

   ```sh
   sudo ln -s /etc/nginx/sites-available/ucm /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. Add HTTPS with Let's Encrypt:

   ```sh
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d example.com -d www.example.com
   ```

5. To deploy updates: `git pull && pnpm install && pnpm build`, then re-run the `rsync` from step 3. (Optionally wrap those commands in a small deploy script or a GitHub Action over SSH.)
