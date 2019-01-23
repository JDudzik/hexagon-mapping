let supportsWebp = undefined;

export default async function() {
  if (supportsWebp !== undefined) {
    return supportsWebp;
  }

  // eslint-disable-next-line no-restricted-globals
  if (!self.createImageBitmap) {
    supportsWebp = false;
    return false;
  };

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  supportsWebp = await createImageBitmap(blob).then(() => true, () => false);
  return supportsWebp;
}
