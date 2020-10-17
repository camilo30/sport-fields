import {BookingStatus, BookingType} from './types';
import {User} from './user';
import {Attachment} from './attachment';
import {Schedule} from './Schedule';

export interface Booking{
    _id: string;
    bkgType: BookingType;
    bkgStatus: BookingStatus;
    user: User;
    attachment: [Attachment];
    schedule: Schedule;
    createdAt: string;
}
