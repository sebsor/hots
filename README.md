# HotS Talent Calculator — GitHub Pages + Phone Install

This folder is a complete, self-contained static site. It has no build
step and no dependencies to install — everything the app needs
(React included) is already compiled into `app.js`.

## 1. Put it on GitHub Pages

**If you don't already have a repo for this:**
1. Create a new repository on GitHub (public or private both work with
   GitHub Pages, though a private repo needs GitHub Pro/Team/Enterprise
   to publish Pages from it — public is simplest if you're on a free plan).
2. Upload every file in this folder to the repo, **keeping the folder
   structure** (the `icons/` folder needs to stay a folder, not get
   flattened). The easiest way if you don't use git day-to-day: on the
   repo's GitHub page, use "Add file → Upload files" and drag the whole
   folder in.

**Enable Pages:**
1. In the repo, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Pick your default branch (usually `main`) and folder `/ (root)` —
   unless you uploaded these files into a `/docs` folder, in which case
   pick `/docs`.
4. Save. GitHub will give you a URL like
   `https://<your-username>.github.io/<repo-name>/` — it can take a
   minute or two to go live the first time.

## 2. Install it on your phone

Open that URL on your phone in a real browser (not an in-app browser
like Instagram/Twitter's — those block installing).

**Android (Chrome):**
- Tap the **⋮** menu → **"Add to Home screen"** (sometimes it also
  offers this as a banner automatically).

**iPhone (must be Safari — Chrome on iOS can't install PWAs):**
- Tap the **Share** icon (square with an arrow) → **"Add to Home Screen"**.

Either way, you'll get a real home-screen icon that opens full-screen,
with no browser address bar — it behaves like an installed app.

## About offline use and updates

- A service worker caches the app so it keeps working with no signal
  once it's been opened at least once — this includes every hero
  portrait image, precached on first install so browsing the full roster
  works offline right away, not just for heroes you've already viewed.
- If you update these files later (new heroes, fixes, etc.), bump the
  `CACHE_VERSION` string at the top of `service-worker.js` before you
  redeploy — that's what tells phones that already have it installed to
  fetch the new version instead of continuing to serve the old cached one.

## About saved builds

Saved builds are stored in the browser's local storage, scoped to this
exact URL. That means:
- They'll survive closing the app, restarting your phone, and reopening
  it later — this isn't in-memory, it's real persistent storage.
- They're specific to the device (and browser, if not installed) you
  saved them on — there's no account system or syncing between devices.
- Uninstalling the app **or clearing site data/browsing data** for this
  site will delete them, so treat it like any other browser storage,
  not like cloud-backed data.

## Making changes later

`app.js` is a compiled, minified bundle — it's not meant to be hand-edited.
If you want changes (new heroes, feature tweaks, etc.), go back to the
source `talent-calculator.jsx` file and have it recompiled from there,
then redeploy the resulting `app.js` alongside these other files.

## About the hero portrait images

The images in `heroes/` are Blizzard's own official hero portraits
(the same assets used by other community sites like Icy-Veins and
HeroesProfile), not anything generated for this project. That's normal
for a fan-made, non-commercial tool like this one, but worth knowing if
you ever plan to distribute this more broadly.
