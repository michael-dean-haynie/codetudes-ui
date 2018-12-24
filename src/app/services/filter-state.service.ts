import { Injectable } from '@angular/core';
import { FilterFacet } from '../models/filter-facet.model';
import { FilterFacetMode } from '../enums/fitter-facet-mode';

@Injectable({
  providedIn: 'root',
})
export class FilterStateService {
  filterValue = '';
  appliedFacets: FilterFacet[] = [];
  currentFilterFacetMode = FilterFacetMode.And;
  constructor() {}
}
