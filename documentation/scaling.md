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
