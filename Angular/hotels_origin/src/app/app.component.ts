import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import store from '@/app/store'
import { AppSearchGroup, AppCollect, AppFilterBox } from './component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    AppFilterBox,
    AppSearchGroup,
    AppCollect,
    RouterOutlet,
  ]
})

export class AppComponent {

  readonly store = inject(store)

  toggleCollect = signal<boolean>(false)
}
