import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import uniqid from 'uniqid';
import { getLocationList } from './services/getLocationList';
import { createMarkerIcon } from './utils/createMarkerIcon';

//Mapbox Gl access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uemFsZXpqb25hdGhhbmplc3VzIiwiYSI6ImNrMDRkeXg3NzNlcTczY21sdmx3YmNsbjIifQ.RINmg0hKUgTPyix7Vh9JrQ'

//Map settigns

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-58.3826487, -34.6035689],
    zoom: 13
});

//Map things working

const markerList = [];


map.on('load', async () => {
	const locationList = await getLocationList();
	console.log(locationList)



	map.addSource("locations", {
		"type": "geojson",
		"data": locationList
	});

	locationList.features.forEach(function(marker) {
		const markerID = uniqid();

		const button = document.createElement('button');
		const popup = new mapboxgl.Popup({offset:25})
			.setHTML(`
				<h3>${marker.properties.name}</h3>
				<p>${marker.properties.adress}</p>
				<p class="popup-category">${marker.properties.category}</p>
				<div class="popup-coordinates>
						<div>Coordenadas { X, Y }</div>
						<div>
								<span>${marker.geometry.coordinates[0]}</span>
								<span>${marker.geometry.coordinates[1]}</span>
						</div>
				</div>
			`);

		const markerInstance = new mapboxgl.Marker(createMarkerIcon())
			.setLngLat(marker.geometry.coordinates)
			.setPopup(popup)
			.addTo(map);

		markerList.push(markerInstance);

		
	});

	const formState = {
		name: '',
		adress: '',
		phone: '',
		category: '',
		lng: -34.6035689,
		lat: -58.3826487
	}
	
	
	function generateMarker (e) {
		e.preventDefault();
	
		formState.name = document.querySelector('#name').value,
		formState.adress = document.querySelector('#adress').value;
		formState.category = document.querySelector('#category').value;
		formState.lng = parseFloat(document.querySelector('#lng').value);
		formState.lat = parseFloat(document.querySelector('#lat').value);
	
		const coordinates = [formState.lng, formState.lat];
	
		const popup = new mapboxgl.Popup({ closeOnClick: false, className: 'popup'})
				.setHTML(`
						<h3>${formState.name}</h3>
						<p>${formState.adress}</p>
						<p class="popup-category">${formState.category}</p>
						<div class="popup-coordinates>
								<div>Coordenadas { X, Y }</div>
								<div>
										<span>${formState.lat}</span>
										<span>${formState.lng}</span>
								</div>
						</div>
				`);
	
		const marker = new mapboxgl.Marker()
				.setLngLat(coordinates)
				.setPopup(popup)
				.addTo(map);
	
		map.flyTo({ center: coordinates, zoom: 9});
	
		markerList.push(formState)
	}
	
	document.querySelector('.marker-data').addEventListener('submit', function (e) {
		e.preventDefault();
	
		formState.name = document.querySelector('#name').value,
		formState.adress = document.querySelector('#adress').value;
		formState.category = document.querySelector('#category').value;
		formState.lng = parseFloat(document.querySelector('#lng').value);
		formState.lat = parseFloat(document.querySelector('#lat').value);
	
		const coordinates = [formState.lng, formState.lat];
	
		const popup = new mapboxgl.Popup({ closeOnClick: false, className: 'popup'})
				.setHTML(`
						<h3>${formState.name}</h3>
						<p>${formState.adress}</p>
						<p class="popup-category">${formState.category}</p>
						<div class="popup-coordinates>
								<div>Coordenadas { X, Y }</div>
								<div>
										<span>${formState.lat}</span>
										<span>${formState.lng}</span>
								</div>
						</div>
				`);
	
		const marker = new mapboxgl.Marker(createMarkerIcon())
				.setLngLat(coordinates)
				.setPopup(popup)
				.addTo(map);
	
		map.flyTo({ center: coordinates, zoom: 15});
	
		axios.post('http://localhost:5000/api/locationlist', {
			'coordinates': coordinates,
			'name': formState.name,
			'adress': formState.adress,
			'category': formState.category,
		});
	
		markerList.push(formState)
	} );
	
	map.on('click', (e) => {
			formState.lng = e.lngLat.lng,
			formState.lat = e.lngLat.lat;
			document.querySelector('#lng').value = e.lngLat.lng;
			document.querySelector('#lat').value = e.lngLat.lat;   
	});
});




