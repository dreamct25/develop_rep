/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RenderItemComponent } from './render-item.component';

describe('RenderItemComponent', () => {
  let component: RenderItemComponent;
  let fixture: ComponentFixture<RenderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
