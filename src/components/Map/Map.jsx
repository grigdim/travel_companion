import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
import mapStyles from '../../mapStyles';

const Map = ({ coordinates, setCoordinates, places, setBounds, setChildClicked }) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery('(min-width:600px)');

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyB71lu6QRSA1_Ji_38CZbFWZIFZFkZBtlQ' }}
				defaultCenter={coordinates}
				center={coordinates}
				defaultZoom={16}
				margin={[ 50, 50, 50, 50 ]}
				options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
				onChange={(e) => {
					setCoordinates({ lat: e.center.lat, lg: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}}
				onChildClick={(child) => setChildClicked(child)}
			>
				{places.length &&
					places.map((place, i) => (
						<div
							className={classes.markerContainer}
							lat={Number(place.latitude)}
							lng={Number(place.longitude)}
							key={i}
						>
							{!isDesktop ? (
								<LocationOnOutlinedIcon color="primary" fontSize="large" />
							) : (
								<Paper elevation={3} className={classes.paper}>
									<Typography className={classes.typography} variant="subtitle2" gutterBottom>
										{place.name}
									</Typography>
									<img
										className={classes.pointer}
										src={
											place.photo ? (
												place.photo.images.large.url
											) : (
												'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/high-protein-dinners-slow-cooker-meatballs-image-5a04d02.jpg?quality=90&resize=500,454'
											)
										}
										alt={place.name}
									/>
									<Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
								</Paper>
							)}
						</div>
					))}
			</GoogleMapReact>
		</div>
	);
};

export default Map;
