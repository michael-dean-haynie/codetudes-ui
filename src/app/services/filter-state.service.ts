import { Injectable } from '@angular/core';
import { FilterFacet } from '../models/filter-facet.model';
import { FilterFacetMode } from '../enums/fitter-facet-mode';
import { Codetude } from '../models/codetude.model';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class FilterStateService {
  filterValue = '';
  appliedFacets: FilterFacet[] = [];
  currentFilterFacetMode = FilterFacetMode.And;

  // stuff from backend
  allCodetudes: Codetude[] = [];
  allTags: Tag[] = [];

  constructor() {}
}
