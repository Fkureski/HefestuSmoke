import { ComponentFixture, TestBed } from '@angular/core/testing';
import { narguilesComponent } from './narguiles.component';

describe('narguilesComponent', () => {
  let component: narguilesComponent;
  let fixture: ComponentFixture<narguilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [narguilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(narguilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
