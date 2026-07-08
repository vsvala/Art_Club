# Performance & Scaling

Documents the performance optimisations applied to the frontend to reduce initial load time and bandwidth usage.

---

## Route-level code splitting

**Problem:** All page components were imported statically in `App.js`, so the browser had to download the entire JavaScript bundle before anything could be rendered — even components the user might never visit.

**Solution:** Replaced static imports with `React.lazy()` for every route-level component. Each component is now bundled into its own chunk and downloaded only when the user navigates to that route.

```js
// Before — everything loaded immediately on startup
import ArtworkList from './components/artwork/ArtworkList'
import EventList   from './components/event/EventList'

// After — loaded only when the user navigates to that route
const ArtworkList = lazy(() => import('./components/artwork/ArtworkList'))
const EventList   = lazy(() => import('./components/event/EventList'))
```

`React.Suspense` wraps the route tree and shows a fallback while a chunk is being fetched:

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    ...
  </Routes>
</Suspense>
```

**What stays eagerly loaded:** `Home` (the landing page — always needed immediately), `AppNavigation`, `Notification`, and `PrivateRoute` (always rendered on every route).

**Result:** The initial bundle is significantly smaller. Users download only the code for the page they are on, and subsequent pages load their chunks on demand.

---

## Native image lazy loading

**Problem:** The artwork gallery renders all images in the list at once, causing the browser to fetch every image on page load even if most are below the fold.

**Solution:** Added the native HTML `loading="lazy"` attribute to gallery `<img>` elements in `ArtworkList.js`:

```jsx
<img
  src={a.galleryImage}
  className="galleryPicture"
  alt="img"
  loading="lazy"
/>
```

The browser defers fetching each image until it is close to the viewport. No JavaScript or third-party library required — this is a built-in browser feature supported by all modern browsers.

**Result:** Reduced initial network requests and bandwidth on the gallery page.

---

## Cloudinary image optimisation

**Problem:** Gallery images were served at their original upload resolution — for example a 4 MB / 4000×3000 px file — regardless of the display size. In the gallery list an image is shown at ~300 px wide, so the browser was downloading roughly 100× more data than needed.

**Solution:** Added a `cloudinaryOptimize` helper in `src/utils/cloudinary-optimize.js` that inserts Cloudinary URL transformation parameters into the image URL before it is passed to `<img src>`:

```js
const cloudinaryOptimize = (url, width = 400) => {
  if (!url || !url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/w_${width},f_auto,q_auto/`)
}
```

- `w_<n>` — resizes the image to the given pixel width on the Cloudinary side before delivery
- `f_auto` — Cloudinary picks the best format for the requesting browser (WebP / AVIF for modern browsers, JPEG as fallback)
- `q_auto` — automatically selects the lowest quality that still looks good, minimising file size

The helper is applied in every component that renders a `galleryImage`, with a width appropriate to the display context:

| Component | Width | Context |
|---|---|---|
| `ArtworkList.js` | 400 px | Gallery grid thumbnails |
| `ArtworkDelete.js` | 400 px | Admin delete view thumbnails |
| `SingleArtwork.js` | 1200 px | Full artwork detail page |
| `SingleArtist.js` | 800 px | Artist profile page |

The helper returns the original URL unchanged for any URL that does not contain `/upload/`, so non-Cloudinary images are safe.

**Result:** A 4 MB original upload is served as ~40 KB in the gallery list. Page load time and Cloudinary bandwidth drop dramatically, especially on mobile connections.

---

## Verifying the changes

### Code splitting

1. Run `npm run build` — the output will list multiple `.chunk.js` files instead of one large bundle.
2. Open the app in the browser, open DevTools → Network → filter by JS.
3. Load the page — only the initial chunks appear.
4. Navigate to `/artworks` — a new chunk downloads at that moment.

### Image lazy loading

1. Open the gallery page in the browser with DevTools → Network → filter by Img.
2. Images below the fold are not fetched on load.
3. Scroll down — each image request fires as it enters the viewport.

Alternatively, throttle the network to Slow 3G in DevTools to make both effects clearly visible.

### Cloudinary image optimisation

1. Open the gallery page with DevTools → Network → filter by Img.
2. Click any image request — the URL should contain `/upload/w_400,f_auto,q_auto/`.
3. Check the transferred size: should be tens of kilobytes, not megabytes.
4. Navigate to a single artwork page — URL should contain `w_1200,f_auto,q_auto`.
5. Open an artist profile — URL should contain `w_800,f_auto,q_auto`.
