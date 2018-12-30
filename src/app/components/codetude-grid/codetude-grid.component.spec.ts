import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodetudeGridComponent } from './codetude-grid.component';

describe('CodetudeGridComponent', () => {
  let component: CodetudeGridComponent;
  let fixture: ComponentFixture<CodetudeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodetudeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodetudeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
