import axios from 'axios';

export const getPlacesData = async (type, ne, sw) => {
	try {
		const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
			params: {
				bl_latitude: sw.lat,
				tr_latitude: ne.lat,
				bl_longitude: sw.lng,
				tr_longitude: ne.lng
			},
			headers: {
				'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
				'x-rapidapi-key': '1fac68ecd4mshbff963985e768b5p1f77d5jsncc6c70b52d88'
			}
		});
		return data;
	} catch (err) {
		console.log(err);
	}
};
