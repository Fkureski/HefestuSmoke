import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagAdmComponent } from './pag-adm.component';

describe('PagAdmComponent', () => {
  let component: PagAdmComponent;
  let fixture: ComponentFixture<PagAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagAdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
