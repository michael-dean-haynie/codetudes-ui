import { Injectable } from '@angular/core';
import { SortMode } from 'src/app/enums/sort-mode';
import { CodetudesDisplayMode } from '../enums/codetudes-display-mode';
import { FilterFacetMode } from '../enums/fitter-facet-mode';
import { SortableFields } from '../enums/sortable-fields';
import { Codetude } from '../models/codetude.model';
import { FilterFacet } from '../models/filter-facet.model';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  // stuff from backend
  allCodetudes: Codetude[] = [];
  allTags: Tag[] = [];

  constructor() {}

  getFilterValue(): string {
    return window.localStorage.getItem('filterValue') || '';
  }

  setFilterValue(filterValue: string): void {
    window.localStorage.setItem('filterValue', filterValue);
  }

  getAppliedFacets(): FilterFacet[] {
    return (
      JSON.parse(window.localStorage.getItem('appliedFacets')).map(
        (json: FilterFacet) => new FilterFacet(json.type, json.value)
      ) || []
    );
  }

  setAppliedFacets(appliedFacets: FilterFacet[]): void {
    window.localStorage.setItem('appliedFacets', JSON.stringify(appliedFacets));
  }

  getFilterFacetMode(): FilterFacetMode {
    return (
      JSON.parse(window.localStorage.getItem('filterFacetMode')) ||
      FilterFacetMode.And
    );
  }

  setFilterFacetMode(filterFacetMode: FilterFacetMode): void {
    window.localStorage.setItem(
      'filterFacetMode',
      JSON.stringify(filterFacetMode)
    );
  }

  getCodetudesDisplayMode(): CodetudesDisplayMode {
    return (
      JSON.parse(window.localStorage.getItem('codetudesDisplayMode')) ||
      CodetudesDisplayMode.Grid
    );
  }

  setCodetudesDisplayMode(codetudesDisplayMode: CodetudesDisplayMode): void {
    window.localStorage.setItem(
      'codetudesDisplayMode',
      JSON.stringify(codetudesDisplayMode)
    );
  }

  getSortField(): SortableFields {
    return (
      JSON.parse(window.localStorage.getItem('sortField')) ||
      SortableFields.Date
    );
  }

  setSortField(sortField: SortableFields): void {
    window.localStorage.setItem('sortField', JSON.stringify(sortField));
  }

  getSortMode(): SortMode {
    return (
      JSON.parse(window.localStorage.getItem('sortMode')) || SortMode.Descending
    );
  }

  setSortMode(sortMode: SortMode): void {
    window.localStorage.setItem('sortMode', JSON.stringify(sortMode));
  }
}
