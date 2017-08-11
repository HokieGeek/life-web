import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetridishComponent } from './petridish.component';

describe('PetridishComponent', () => {
  let component: PetridishComponent;
  let fixture: ComponentFixture<PetridishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetridishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetridishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
