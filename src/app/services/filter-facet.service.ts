import { AuthService } from './auth.service';
import { TagService } from './tag.service';
import { Injectable } from '@angular/core';
import { FilterFacet } from '../models/filter-facet.model';
import { FilterFacetType } from '../enums/filter-facet-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { CodetudeService } from './codetude.service';
import { FilterStateService } from './filter-state.service';

@Injectable({
  providedIn: 'root',
})
export class FilterFacetService {
  constructor(
    private tagService: TagService,
    private codetudeService: CodetudeService,
    private filterStateService: FilterStateService,
    private authSerivce: AuthService
  ) {}

  getSuggestedFilterFacets(
    filterValue: string,
    appliedFacets: FilterFacet[]
  ): FilterFacet[] {
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
      this.filterStateService.allTags.forEach(tag => {
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
          suggestedFacets.push(new FilterFacet(FilterFacetType.Tag, tag.name));
        }
      });
    }
    return suggestedFacets;
  }

  facetAlreadyApplied(
    facet: FilterFacet,
    appliedFacets: FilterFacet[]
  ): boolean {
    return appliedFacets.some(sugFac => sugFac.sameAs(facet));
  }

  getMatchCountForFilterFacet(facet: FilterFacet): number {
    return this.filterStateService.allCodetudes.filter(
      codetude =>
        codetude.matchesFacet(facet) &&
        (codetude.live || this.authSerivce.userIsLoggedIn())
    ).length;
  }
}
