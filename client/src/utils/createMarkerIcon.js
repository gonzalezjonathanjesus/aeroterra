import uniqid from 'uniqid';

export const createMarkerIcon = () => {
  const markerIcon = document.createElement('div');

  markerIcon.className = 'marker';
  markerIcon.id = uniqid();
  markerIcon.style.backgroundImage = 'url(images/symbol-marker.png)';
  markerIcon.style.backgroundSize = '100%';
  markerIcon.style.backgroundPosition = 'center';
  markerIcon.style.width = '30px';
  markerIcon.style.height = '30px';

  return markerIcon;
}