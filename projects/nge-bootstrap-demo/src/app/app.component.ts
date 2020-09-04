import { Component, ChangeDetectorRef } from '@angular/core';
import { ToastConfig } from 'projects/nge-bootstrap/src/lib/toast/toast.module';

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
    this.toast = {text: 'This is Toast', delay: 1000, autoHide: false} as ToastConfig;
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
