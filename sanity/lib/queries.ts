export const COMMITTEES_QUERY = `*[_type == "committee"] {
  id,
  name,
  "imageUrl": image.asset->url,
  "dimensions": image.asset->metadata.dimensions,
  link
}`;

export const SECRETARIAT_QUERY = `*[_type == "secretariat"] {
  id,
  name,
  "imageUrl": image.asset->url,
  "dimensions": image.asset->metadata.dimensions,
  link
}`;