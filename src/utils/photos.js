const PLACEHOLDER_COLORS = [
  '#f8bbd0', '#e1bee7', '#bbdefb', '#b2dfdb',
  '#ffe0b2', '#ffccbc', '#d1c4e9', '#c8e6c9',
];

export function getPhotos(userPhotos) {
  if (userPhotos.length > 0) return userPhotos;

  return Array.from({ length: 8 }, (_, i) => ({
    id: `placeholder-${i + 1}`,
    src: '',
    caption: `回忆 ${i + 1}`,
    placeholderColor: PLACEHOLDER_COLORS[i],
  }));
}
