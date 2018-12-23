import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterFacet } from 'src/app/models/filter-facet.model';
import { FilterFacetType } from 'src/app/enums/filter-facet-type';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { FilterFacetMode } from 'src/app/enums/fitter-facet-mode';

@Component({
  selector: 'app-codetude-filter',
  templateUrl: './codetude-filter.component.html',
  styleUrls: ['./codetude-filter.component.css'],
})
export class CodetudeFilterComponent implements OnInit {
  @Input() allTags: Tag[] = [];

  @Output() appliedFacetsChanged = new EventEmitter<FilterFacet[]>();
  @Output() filterFacetModeChanged = new EventEmitter<FilterFacetMode>();

  filterValue = '';
  appliedFacets: FilterFacet[] = [];
  suggestedFacets: FilterFacet[] = [];
  currentFilterFacetMode = FilterFacetMode.And;
  FilterFacetMode = FilterFacetMode; // so the enum is accessible to the template

  constructor(private tagService: TagService) {}

  ngOnInit() {
    // load all tags
    this.tagService.findAll().subscribe((tags: Tag[]) => {
      this.allTags = tags;
    });
  }

  onFilterChange(): void {
    this.updateSuggestedFilterFacets();
  }

  setFilterFacetMode(mode: FilterFacetMode): void {
    this.currentFilterFacetMode = mode;
    this.filterFacetModeChanged.emit(mode);
  }

  updateSuggestedFilterFacets(): void {
    this.suggestedFacets = [];
    if (this.filterValue.length > 0) {
      // suggest raw text facet (if not already applied)
      const potentialTextFacet: FilterFacet = new FilterFacet(
        FilterFacetType.Text,
        this.filterValue
      );
      if (!this.facetAlreadyApplied(potentialTextFacet)) {
        this.suggestedFacets.push(potentialTextFacet);
      }

      // suggest tags (if not already applied)
      this.allTags.forEach(tag => {
        const potentialTagFacet: FilterFacet = new FilterFacet(
          FilterFacetType.Tag,
          tag.name
        );
        const filterValueInTagName: boolean = tag.name
          .toLowerCase()
          .includes(this.filterValue.toLowerCase().trim());

        if (
          filterValueInTagName &&
          !this.facetAlreadyApplied(potentialTagFacet)
        ) {
          this.suggestedFacets.push(
            new FilterFacet(FilterFacetType.Tag, tag.name)
          );
        }
      });
    }
  }

  facetAlreadyApplied(facet: FilterFacet): boolean {
    return this.appliedFacets.some(sugFac => sugFac.sameAs(facet));
  }

  applyFacet(facet: FilterFacet): void {
    this.appliedFacets.push(facet);
    this.appliedFacetsChanged.emit(this.appliedFacets);

    // reset filter value and suggestions
    this.filterValue = '';
    this.onFilterChange();
  }

  removeFacet(facet: FilterFacet): void {
    this.appliedFacets = this.appliedFacets.filter(
      appFac => !appFac.sameAs(facet)
    );
    this.appliedFacetsChanged.emit(this.appliedFacets);

    this.updateSuggestedFilterFacets();
  }
}
