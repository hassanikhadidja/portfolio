/**
 * Inject Cloudinary delivery transforms into image/video URLs.
 * Leaves non-Cloudinary URLs unchanged.
 */
export function withCloudinary(url, transforms = '') {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com') || !transforms) return url;

  const marker = '/upload/';
  const i = url.indexOf(marker);
  if (i === -1) return url;

  const after = url.slice(i + marker.length);
  // Avoid double-applying if transforms already present
  if (/^(c_|w_|q_|f_|so_|vc_)/.test(after) || after.includes(',')) {
    return url;
  }

  return `${url.slice(0, i + marker.length)}${transforms}/${after}`;
}

/** Hero poster still (shows instantly while video buffers) */
export function heroVideoPoster(videoUrl) {
  if (!videoUrl?.includes('/video/upload/')) return undefined;
  return videoUrl
    .replace('/video/upload/', '/video/upload/so_0,w_1280,h_720,c_fill,q_auto,f_jpg/')
    .replace(/\.(mp4|webm|mov)(\?.*)?$/i, '.jpg');
}

/** Responsive hero video — lighter on phones */
export function heroVideoSources(videoUrl) {
  if (!videoUrl?.includes('res.cloudinary.com')) {
    return { desktop: videoUrl, mobile: videoUrl };
  }
  return {
    mobile: withCloudinary(videoUrl, 'w_720,c_limit,q_auto:eco,vc_auto,f_mp4'),
    desktop: withCloudinary(videoUrl, 'w_1280,c_limit,q_auto,vc_auto,f_mp4'),
  };
}

export function imgUrl(url, { width = 1200, quality = 'auto' } = {}) {
  return withCloudinary(url, `w_${width},c_limit,q_${quality},f_auto`);
}
