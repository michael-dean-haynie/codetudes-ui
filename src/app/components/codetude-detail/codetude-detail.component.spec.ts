import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodetudeDetailComponent } from './codetude-detail.component';

describe('CodetudeDetailComponent', () => {
  let component: CodetudeDetailComponent;
  let fixture: ComponentFixture<CodetudeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodetudeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodetudeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
