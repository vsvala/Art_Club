const cloudinaryOptimize = (url, width = 400) => {
  if (!url || !url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/w_${width},f_auto,q_auto/`)
}
export default cloudinaryOptimize

//- `w_400` — scales the width to 400 pixels
//- `f_auto` — Cloudinary picks the optimal format (WebP or AVIF for modern
//  browsers, JPEG for older ones)
//- `q_auto` — automatic quality: smallest file size while preserving perceived quality
