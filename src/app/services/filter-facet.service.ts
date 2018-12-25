import { TagService } from './tag.service';
import { Injectable } from '@angular/core';
import { FilterFacet } from '../models/filter-facet.model';
import { FilterFacetType } from '../enums/filter-facet-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class FilterFacetService {
  constructor(private tagService: TagService) {}

  /**
   * Create observable of all tags and map it to an observable of facets.
   * Return the facts observable
   * @param filterValue
   * @param appliedFacets
   */
  getSuggestedFilterFacets(
    filterValue: string,
    appliedFacets: FilterFacet[]
  ): Observable<FilterFacet[]> {
    return this.tagService.findAll().pipe(
      map(allTags => {
        const suggestedFacets = [];
        if (filterValue.length > 0) {
          // suggest raw text facet (if not already applied)
          const potentialTextFacet = new FilterFacet(
            FilterFacetType.Text,
            filterValue
          );
          if (!this.facetAlreadyApplied(potentialTextFacet, appliedFacets)) {
            suggestedFacets.push(potentialTextFacet);
          }

          // suggest tags (if not already applied)
          allTags.forEach(tag => {
            const potentialTagFacet = new FilterFacet(
              FilterFacetType.Tag,
              tag.name
            );
            const filterValueInTagName: boolean = tag.name
              .toLowerCase()
              .includes(filterValue.toLowerCase().trim());

            if (
              filterValueInTagName &&
              !this.facetAlreadyApplied(potentialTagFacet, appliedFacets)
            ) {
              suggestedFacets.push(
                new FilterFacet(FilterFacetType.Tag, tag.name)
              );
            }
          });
        }
        return suggestedFacets;
      })
    );
  }

  facetAlreadyApplied(
    facet: FilterFacet,
    appliedFacets: FilterFacet[]
  ): boolean {
    return appliedFacets.some(sugFac => sugFac.sameAs(facet));
  }
}
