import api from '../api';

interface CreatePayload {
	from: Date;
	to: Date;
	roomNumber: string;
	guestName: string;
}

async function putCreateBooking(createPayload: CreatePayload) {
	return api.put('/booking/create', { data: createPayload });
}

export default putCreateBooking;
