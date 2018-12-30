import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodetudeTableComponent } from './codetude-table.component';

describe('CodetudeTableComponent', () => {
  let component: CodetudeTableComponent;
  let fixture: ComponentFixture<CodetudeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodetudeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodetudeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
