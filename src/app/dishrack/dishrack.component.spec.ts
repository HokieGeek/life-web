import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishrackComponent } from './dishrack.component';

describe('DishrackComponent', () => {
  let component: DishrackComponent;
  let fixture: ComponentFixture<DishrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
