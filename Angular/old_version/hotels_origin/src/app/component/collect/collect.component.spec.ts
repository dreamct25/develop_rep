/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectComponent } from './collect.component';

describe('CollectComponent', () => {
  let component: CollectComponent;
  let fixture: ComponentFixture<CollectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
