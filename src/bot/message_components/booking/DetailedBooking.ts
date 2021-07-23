import PmsBookingEntity from '../../../api/entities/PmsBookingEntity';
import BriefBooking from './BriefBooking';
import moment from 'moment';

function DetailedBooking(
	entity: PmsBookingEntity
): string {
	return (
		BriefBooking(entity) +
		(entity.remindedPrepayment ? `\nНапомнил за предоплату ${moment(entity.remindedPrepayment).format('lll')}` : '')
	);
}

export default DetailedBooking;
