import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nge-demo';
  selected = 'CSS';
  options = ['HTML', 'CSS', 'Javascript'];
  toast: any;
  constructor(){}
  showToast(){
    this.toast = {'test': 1};
  }
  hideToast() {
    this.toast = null;
  }

}
