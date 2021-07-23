import PmsBookingEntity from '../entities/PmsBookingEntity';
import api from '../api';

async function fetchClientBookings(clientId: string): Promise<PmsBookingEntity[]> {
	return await api.get(`/bookings/owner/${clientId}`) as [];
}

export default fetchClientBookings;
