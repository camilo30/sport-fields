import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';



declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  user: any ;
  constructor(
    private authService: AuthService
  ) {  }

  ngOnInit(): void {

    if (this.authService.loggedIn()) {
    }

   /* document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
*/
    document.addEventListener('DOMContentLoaded', function() {
      M.AutoInit();
    });

  }
}
