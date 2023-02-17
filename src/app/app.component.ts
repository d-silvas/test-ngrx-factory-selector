import { Component } from '@angular/core';
import * as selectors from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // For APPROACH #3
  getName3Selector: any;

  constructor() {
    this.getName3Selector = selectors.getName3('qqq');
  }
}
