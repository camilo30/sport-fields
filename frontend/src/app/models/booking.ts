import {BookingStatus, BookingType} from './types';
import {User} from './user';
import {Attachment} from './attachment';
import {Schedule} from './Schedule';

export interface Booking{
    _id: string;
    createdAT: string;
    bkgType: BookingType;
    bkgStatus: BookingStatus;
    desc: string;
    user: User;
    comment: string;
    attachment: [Attachment];
    schedule: [Schedule];
    createdAt: string;
}
