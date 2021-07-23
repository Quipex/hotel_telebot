import PmsBookingEntity from '../entities/PmsBookingEntity';
import api from '../api';

async function fetchBookingsExpiredAndReminded(): Promise<PmsBookingEntity[]> {
	return await api.get('/bookings/expired_remind') as [];
}

export default fetchBookingsExpiredAndReminded;
