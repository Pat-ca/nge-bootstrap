import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nge-demo';
  selected = 'CSS';
  options = ['HTML', 'CSS', 'Javascript'];
  state: any = {};
  toast: any;
  constructor(private cd: ChangeDetectorRef){}
  showToast(){
    this.toast = {'test': 1};
    this.cd.detectChanges();
  }
  hideToast() {
    this.toast = null;
    this.cd.detectChanges();
  }
 setState(key, value){
   this.state[key]= value;
 }
}
