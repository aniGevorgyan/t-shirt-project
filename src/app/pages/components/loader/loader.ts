import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: '<div class="box loading-game"></div>',
  styleUrls: ['./loader.scss'],
})

export class Loader {}
