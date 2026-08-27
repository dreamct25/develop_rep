import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true
})

export class AppLoading {
  propsHaveLoading = input.required<boolean>()
}
