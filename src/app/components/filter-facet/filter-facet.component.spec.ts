import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFacetComponent } from './filter-facet.component';

describe('FilterFacetComponent', () => {
  let component: FilterFacetComponent;
  let fixture: ComponentFixture<FilterFacetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterFacetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
