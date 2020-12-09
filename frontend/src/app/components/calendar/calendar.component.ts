import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {FieldService} from '../../services/field.service';
import {SchedulesService} from '../../services/schedules.service';
import {Field} from '../../models/field';
import {Schedule} from '../../models/Schedule';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../models/booking";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  field: Field;
  schedules: Schedule[];
  bookings: [Booking];
  user: User;
  ev: any;
  calendarOptions: CalendarOptions;
  calendarOptionsM: CalendarOptions;

  constructor(
    private authService: AuthService,
    private fieldService: FieldService,
    private bookingService: BookingService,
    private scheduleService: SchedulesService
  ) {
    this.ev = [];
    this.getUser();
    if (this.mobilecheck()){
      this.calendarOptions = {
        initialView: 'listWeek'
      };
    }
  }

  ngOnInit(): void {
    this.getUser();
  }

    mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };

  getUser(){
    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.user = res;
      if (this.field){
        this.fillCalendar();
      }else {
        this.getField();
      }
    });


  }

  getField(){
    this.fieldService.getSelectedField().subscribe(res => {
      this.field = res;
      this.fillCalendar();
    });
  }

  fillCalendar() {
    this.ev = [];

    if (this.user.role.name === 'director') {
      if (this.field) {
        // Obtener reservas del escenario actual con color y titulo
        this.bookingService.getFieldCalendarBookings(this.field._id).subscribe(res => {
          this.bookings = res;
          for (let e of this.bookings) {
            let aux = new Date(e.schedule[0].start);
            let aux2 = new Date(e.schedule[(e.schedule).length - 1].end);
            aux.setHours(aux.getHours());
            aux2.setHours(aux2.getHours());
            if (e.bkgStatus.code === 'A') {
              if(e.bkgType.code === 'E' || e.bkgType.code === 'U'){
                this.ev.push({start: aux, end: aux2, title: e.desc, color: e.schedule[0].field.color});
              } else{
                this.ev.push({start: aux, end: aux2, title: e.user.email, color: e.schedule[0].field.color});
              }

            } else {
              this.ev.push({start: aux, end: aux2, color: e.schedule[0].field.color});
            }
          }
          this.CalendarOptions();
        });


      } else {
        // Obtener todas las reservas
        this.bookingService.getCalendarBookings().subscribe(res => {
          this.bookings = res;
          for (let b of this.bookings) {
            const aux = new Date(b.schedule[0].start);
            const aux2 = new Date(b.schedule[(b.schedule).length - 1].end);
            aux.setHours(aux.getHours());
            aux2.setHours(aux2.getHours());
            if (b.bkgStatus.code === 'A') {
              if (b.bkgType.code === 'E' || b.bkgType.code === 'U'){
                this.ev.push({start: aux, end: aux2, title: b.desc, color: b.schedule[0].field.color});
              } else{
                this.ev.push({start: aux, end: aux2, title: b.user.email, color: b.schedule[0].field.color});
              }

            } else {
              this.ev.push({start: aux, end: aux2, color: b.schedule[0].field.color});
            }
          }
          this.CalendarOptions();
        });
      }
    } else {
      if (this.field) {
        // Obtener reservas del escenario actual
        this.scheduleService.getFieldSchedules(this.field._id).subscribe(res => {
          this.schedules = res;
          for (let e of this.schedules) {
            let aux = new Date(e.start);
            let aux2 = new Date(e.end);
            aux.setHours(aux.getHours());
            aux2.setHours(aux2.getHours());
            if (e.available === true){
              this.ev.push({start: aux, end: aux2, color: '#9b9b9b'});
            } else {
              this.ev.push({start: aux, end: aux2, color: '#fbc02d'});
            }
          }
          this.CalendarOptions();
        });
      }
    }
  }



  CalendarOptions(){
    if (this.mobilecheck()){
      this.calendarOptions = {
        locale: 'es',
        buttonText: {
          today: 'Hoy',
        },
        events: this.ev,
      };
    } else {
      this.calendarOptions = {
        locale: 'es',
        buttonText: {
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          list: 'Lista'
        },
        headerToolbar: {
          center: 'timeGridWeek,dayGridMonth,listWeek',
        },
        slotMinTime: '06:00:00',
        slotMaxTime: '20:00.00',
        events: this.ev,
      };
    }

  }
}

