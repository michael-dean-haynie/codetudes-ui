import { Component, OnInit } from '@angular/core';

import { Codetude } from '../../models/codetude.model';

import { CodetudeService } from '../../services/codetude.service';
import { AuthService } from '../../services/auth.service';
import { EditableCodetude } from '../../models/editable-codetude.model';
import { Tag } from '../../models/tag.model';
import { TagService } from '../../services/tag.service';
import { FilterFacet } from '../../models/filter-facet.model';
import { FilterFacetType } from '../../enums/filter-facet-type';
import { FilterFacetMode } from '../../enums/fitter-facet-mode';

@Component({
  selector: 'app-codetudes',
  templateUrl: './codetudes.component.html',
  styleUrls: ['./codetudes.component.css']
})
export class CodetudesComponent implements OnInit {
  allCodetudes: Codetude[];
  allTags: Tag[];

  displayedCodetudes: Codetude[];

  filterValue: string = '';

  appliedFacets: FilterFacet[] = [];
  suggestedFacets: FilterFacet[] = [];

  filterFacetMode = FilterFacetMode; // so the enum is accessible to the template
  currentFilterFacetMode = FilterFacetMode.And;


  constructor(private codetudeService: CodetudeService, private tagService: TagService, private authService: AuthService ) {}

  ngOnInit() {
    this.codetudeService.findAll().subscribe((codetudes: Codetude[]) => {
      this.allCodetudes = codetudes;
      this.displayedCodetudes = codetudes;
    });

    this.tagService.findAll().subscribe((tags: Tag[]) => {
      this.allTags = tags;
    });
  }

  onFilterChange(): void {
    this.updateSuggestedFilterFacets();
  }

  applyFacet(facet: FilterFacet): void {
    this.appliedFacets.push(facet);
    this.updateDisplayedCodetudes();

    // reset filter value and suggestions
    this.filterValue = '';
    this.onFilterChange();
  }

  removeFacet(facet: FilterFacet): void {
    this.appliedFacets = this.appliedFacets.filter(appFac => !appFac.sameAs(facet));
    this.updateDisplayedCodetudes();

    this.onFilterChange();
  }

  setFilterFacetMode(mode: FilterFacetMode): void {
    this.currentFilterFacetMode = mode;
    this.updateDisplayedCodetudes();
  }

  private facetAlreadyApplied(facet: FilterFacet): boolean {
    return this.appliedFacets.filter(sugFac => sugFac.sameAs(facet)).length > 0;
  }

  private updateSuggestedFilterFacets(): void {
    this.suggestedFacets = [];
    if (this.filterValue.length > 0) {

      // suggest raw text facet (if not already applied)
      let potentialTextFacet: FilterFacet = new FilterFacet(FilterFacetType.Text, this.filterValue);
      if (!this.facetAlreadyApplied(potentialTextFacet)) {
        this.suggestedFacets.push(potentialTextFacet);
      }

      // suggest tags (if not already applied)
      this.allTags.forEach(tag => {
        let potentialTagFacet: FilterFacet = new FilterFacet(FilterFacetType.Tag, tag.name);
        let filterValueInTagName: boolean = tag.name.toLowerCase().includes(this.filterValue.toLowerCase().trim());

        if (filterValueInTagName && !this.facetAlreadyApplied(potentialTagFacet)) {
          this.suggestedFacets.push(new FilterFacet(FilterFacetType.Tag, tag.name));
        }
      });
    }
  }

  private updateDisplayedCodetudes(){
    this.displayedCodetudes = [];

    this.allCodetudes.forEach(codetude => {
      let meetsAllCriteria: boolean = true; // default

      // All applied facets must match
      if (this.currentFilterFacetMode === FilterFacetMode.And) {
        meetsAllCriteria = this.appliedFacets.every(facet => {
          return codetude.matchesFacet(facet);
        });
      }

      // At least one applied facet must match
      if (this.currentFilterFacetMode === FilterFacetMode.Or) {
        meetsAllCriteria = this.appliedFacets.some(facet => {
          return codetude.matchesFacet(facet);
        });
      }

      // final decision  
      if (meetsAllCriteria){
        this.displayedCodetudes.push(codetude);
      }
    });
  }

}
