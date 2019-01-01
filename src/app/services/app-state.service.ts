import { SortMode } from 'src/app/enums/sort-mode';
import { CodetudesDisplayMode } from '../enums/codetudes-display-mode';
import { Injectable } from '@angular/core';
import { FilterFacet } from '../models/filter-facet.model';
import { FilterFacetMode } from '../enums/fitter-facet-mode';
import { Codetude } from '../models/codetude.model';
import { Tag } from '../models/tag.model';
import { SortableFields } from '../enums/sortable-fields';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  filterValue = '';
  appliedFacets: FilterFacet[] = [];
  filterFacetMode = FilterFacetMode.And;
  codetudesDisplayMode = CodetudesDisplayMode.Table;

  // sort selections
  sortField = SortableFields.Date;
  sortMode: SortMode = SortMode.Descending;

  // stuff from backend
  allCodetudes: Codetude[] = [];
  allTags: Tag[] = [];

  constructor() {}
}
