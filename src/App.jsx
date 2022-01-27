import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api';

function App() {
	const [ places, setPlaces ] = useState([]);
	const [ coordinates, setCoordinates ] = useState({});
	const [ bounds, setBounds ] = useState({});
	const [ childClicked, setChildClicked ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ type, setType ] = useState('restaurants');
	const [ rating, setRating ] = useState(0);
	const [ filteredPlaces, setFilteredPlaces ] = useState([]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
			setCoordinates({ lat: latitude, lng: longitude });
		});
	}, []);

	useEffect(
		() => {
			if (bounds.sw && bounds.ne) {
				setIsLoading(true);
				getPlacesData(type, bounds.ne, bounds.sw).then((data) => {
					setPlaces(data && data.filter((place) => place.name && place.num_reviews > 0));
					setFilteredPlaces([]);
					setIsLoading(false);
				});
			}
		},
		[ type, bounds ]
	);

	useEffect(
		() => {
			const filteredPlaces = places.filter((place) => place.rating > rating);
			setFilteredPlaces(filteredPlaces);
		},
		[ rating ]
	);

	return (
		<React.Fragment>
			<CssBaseline />
			<Header setCoordinates={setCoordinates} />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List
						places={filteredPlaces}
						childClicked={childClicked}
						isLoading={isLoading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						coordinates={coordinates}
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						places={filteredPlaces}
						setChildClicked={setChildClicked}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default App;
