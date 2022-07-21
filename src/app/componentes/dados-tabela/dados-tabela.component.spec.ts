import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosTabelaComponent } from './dados-tabela.component';

describe('DadosTabelaComponent', () => {
  let component: DadosTabelaComponent;
  let fixture: ComponentFixture<DadosTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
