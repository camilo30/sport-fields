import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin
import listGridPlugin from '@fullcalendar/list'; // a plugin


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DnisComponent } from './components/dnis/dnis.component';
import { FieldsComponent } from './components/fields/fields.component';
import { FieldPreviewComponent } from './components/field-preview/field-preview.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';


import { AuthGuard } from './auth.guard'
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MainComponent } from './components/main/main.component';
import { TypeOfComponent } from './components/type-of/type-of.component';
import { SigninUserComponent } from './components/signin-user/signin-user.component';
import { BookingComponent } from './components/booking/booking.component';
import { MainDirectorComponent } from './components/main-director/main-director.component';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MainInstructorComponent } from './components/main-instructor/main-instructor.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HelpComponent } from './help/help.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    DnisComponent,
    FieldsComponent,
    FieldPreviewComponent,
    SigninComponent,
    SignupComponent,
    MainComponent,
    TypeOfComponent,
    SigninUserComponent,
    BookingComponent,
    MainDirectorComponent,
    MainAdminComponent,
    CalendarComponent,
    ScheduleComponent,
    MainInstructorComponent,
    NewBookingComponent,
    BookingHistoryComponent,
    ReportsComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
