import PmsBookingEntity from '../entities/PmsBookingEntity';
import api from '../api';

async function fetchBookingsAddedAfter(unixDate: number): Promise<PmsBookingEntity[]> {
	return await api.get(`/bookings/added?after=${unixDate}`) as [];
}

export default fetchBookingsAddedAfter;
