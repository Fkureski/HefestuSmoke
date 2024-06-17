import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNovidadeComponent } from './editar-novidade.component';

describe('EditarNovidadeComponent', () => {
  let component: EditarNovidadeComponent;
  let fixture: ComponentFixture<EditarNovidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarNovidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarNovidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
