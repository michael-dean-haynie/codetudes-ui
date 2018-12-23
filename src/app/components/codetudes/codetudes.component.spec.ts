import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodetudesComponent } from './codetudes.component';

describe('CodetudesComponent', () => {
  let component: CodetudesComponent;
  let fixture: ComponentFixture<CodetudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodetudesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodetudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
