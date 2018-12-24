import { FilterStateService } from './../../services/filter-state.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
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
export class CodetudeFilterComponent implements OnInit, OnDestroy {
  @Input() allTags: Tag[] = [];

  @Output() appliedFacetsChanged = new EventEmitter<FilterFacet[]>();
  @Output() filterFacetModeChanged = new EventEmitter<FilterFacetMode>();

  @ViewChild('filterInput') filterInput: ElementRef;

  filterValue = null;
  inputHasFocus = false;
  appliedFacets: FilterFacet[] = null;
  suggestedFacets: FilterFacet[] = [];
  suggestedFacetsFocusIndex = 0;
  keepFocusOnInputFlag = false;
  currentFilterFacetMode = null;
  FilterFacetMode = FilterFacetMode; // so the enum is accessible to the template

  constructor(
    private tagService: TagService,
    private filterStateService: FilterStateService
  ) {}

  ngOnInit() {
    // load all tags
    this.tagService.findAll().subscribe((tags: Tag[]) => {
      this.allTags = tags;

      // load previous applied facets (only text type or (tag type that match one in allTags))
      this.appliedFacets = this.filterStateService.appliedFacets.filter(
        oldFacet => {
          return (
            oldFacet.type === FilterFacetType.Text ||
            (oldFacet.type === FilterFacetType.Tag &&
              this.allTags.some(
                currentTag => currentTag.name === oldFacet.value
              ))
          );
        }
      );

      this.appliedFacetsChanged.emit(this.appliedFacets);
    });

    // load previous filter value
    this.filterValue = this.filterStateService.filterValue;

    // load previous filter facet mode
    this.currentFilterFacetMode = this.filterStateService.currentFilterFacetMode;
    this.filterFacetModeChanged.emit(this.currentFilterFacetMode);

    // auto focus
    this.focusOnFilterInput();
  }

  ngOnDestroy() {
    this.filterStateService.appliedFacets = this.appliedFacets;
    this.filterStateService.filterValue = this.filterValue;
    this.filterStateService.currentFilterFacetMode = this.currentFilterFacetMode;
  }

  onFilterChange(): void {
    this.updateSuggestedFilterFacets();
  }

  setFilterFacetMode(mode: FilterFacetMode): void {
    this.currentFilterFacetMode = mode;
    this.filterFacetModeChanged.emit(mode);
  }

  onFilterFacetModeButtonClick(mode: FilterFacetMode): void {
    this.keepFocusOnInputFlag = true;
    this.setFilterFacetMode(mode);
    this.focusOnFilterInput();
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

  inputBarIsOpen(): boolean {
    return (
      this.inputHasFocus &&
      this.suggestedFacets &&
      this.suggestedFacets.length > 0
    );
  }

  onInputBlur(): void {
    this.keepFocusOnInputFlag = false;
    setTimeout(() => {
      this.inputHasFocus = this.keepFocusOnInputFlag;
      this.keepFocusOnInputFlag = false;
    }, 200);
  }

  onSuggestedFacetClicked(facet: FilterFacet): void {
    this.keepFocusOnInputFlag = true;
    this.applyFacet(facet);
    this.focusOnFilterInput();
  }

  onAppliedFacetClicked(facet: FilterFacet): void {
    this.removeFacet(facet);
    this.keepFocusOnInputFlag = true;
    this.focusOnFilterInput();
  }

  focusOnFilterInput(): void {
    this.filterInput.nativeElement.focus();
    this.inputHasFocus = true;
  }

  onKeydownFromInput(event: KeyboardEvent): void {
    if (this.suggestedFacets && this.suggestedFacets.length) {
      if (event.key === 'Enter') {
        this.applyFacet(this.suggestedFacets[this.suggestedFacetsFocusIndex]);
        this.suggestedFacetsFocusIndex = 0;
        event.preventDefault();
      }

      if (event.key === 'ArrowUp') {
        if (this.suggestedFacetsFocusIndex > 0) {
          this.suggestedFacetsFocusIndex--;
          event.preventDefault(); // stops cursor from moving in input
        }
      }

      if (event.key === 'ArrowDown') {
        if (this.suggestedFacetsFocusIndex < this.suggestedFacets.length - 1) {
          this.suggestedFacetsFocusIndex++;
          event.preventDefault(); // stops cursor from moving in input
        }
      }
    }
  }
}
