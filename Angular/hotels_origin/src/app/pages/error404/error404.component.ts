import { Component, input, inject, signal, WritableSignal, effect, computed, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-error',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
  standalone: true
})

export class Error404Component {}