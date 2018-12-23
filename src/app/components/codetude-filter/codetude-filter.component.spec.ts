import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodetudeFilterComponent } from './codetude-filter.component';

describe('CodetudeFilterComponent', () => {
  let component: CodetudeFilterComponent;
  let fixture: ComponentFixture<CodetudeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodetudeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodetudeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
