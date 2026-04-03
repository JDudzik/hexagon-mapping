let supportsWebp = undefined;

export default async () => {
  if (supportsWebp !== undefined) {
    return supportsWebp;
  }

   
  if (!self.createImageBitmap) {
    supportsWebp = false;
    return false;
  }

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  // eslint-disable-next-line require-atomic-updates
  supportsWebp = await createImageBitmap(blob).then(() => true, () => false);
  return supportsWebp;
};
