import { AppStateService } from '../../services/app-state.service';
import {
  Component,
  OnInit,
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
import { FilterFacetService } from 'src/app/services/filter-facet.service';

@Component({
  selector: 'app-codetude-filter',
  templateUrl: './codetude-filter.component.html',
  styleUrls: ['./codetude-filter.component.css'],
})
export class CodetudeFilterComponent implements OnInit, OnDestroy {
  @Output() appliedFacetsChanged = new EventEmitter<FilterFacet[]>();
  @Output() filterFacetModeChanged = new EventEmitter<FilterFacetMode>();

  @ViewChild('filterInput') filterInput: ElementRef;

  filterValue = null;
  inputHasFocus = false;
  appliedFacets: FilterFacet[] = null;
  suggestedFacets: FilterFacet[] = [];
  suggestedFacetsFocusIndex = 0;
  keepFocusOnInputFlag = false;
  filterFacetMode = null;
  FilterFacetMode = FilterFacetMode; // so the enum is accessible to the template

  constructor(
    private tagService: TagService,
    private filterFacetService: FilterFacetService,
    private appStateService: AppStateService
  ) {}

  ngOnInit() {
    // TODO move this logic into the service
    // load all tags
    this.tagService.findAll().subscribe((tags: Tag[]) => {
      this.appStateService.allTags = tags;

      // load previous applied facets (only text type or (tag type that match one in allTags))
      this.appliedFacets = this.appStateService.appliedFacets.filter(
        oldFacet => {
          return (
            oldFacet.type === FilterFacetType.Text ||
            (oldFacet.type === FilterFacetType.Tag &&
              this.appStateService.allTags.some(
                currentTag => currentTag.name === oldFacet.value
              ))
          );
        }
      );

      this.appliedFacetsChanged.emit(this.appliedFacets);
    });

    // load previous filter value
    this.filterValue = this.appStateService.filterValue;

    // load previous filter facet mode
    this.filterFacetMode = this.appStateService.filterFacetMode;
    this.filterFacetModeChanged.emit(this.filterFacetMode);

    // auto focus (this got annoying on mobile)
    // this.focusOnFilterInput();
  }

  ngOnDestroy() {
    this.appStateService.appliedFacets = this.appliedFacets;
    this.appStateService.filterValue = this.filterValue;
    this.appStateService.filterFacetMode = this.filterFacetMode;
  }

  onFilterChange(): void {
    this.updateSuggestedFilterFacets();
  }

  setFilterFacetMode(mode: FilterFacetMode): void {
    this.filterFacetMode = mode;
    this.filterFacetModeChanged.emit(mode);
  }

  onFilterFacetModeButtonClick(mode: FilterFacetMode): void {
    this.keepFocusOnInputFlag = true;
    this.setFilterFacetMode(mode);
    this.focusOnFilterInput();
  }

  updateSuggestedFilterFacets(): void {
    this.suggestedFacets = this.filterFacetService.getSuggestedFilterFacets(
      this.filterValue,
      this.appliedFacets
    );
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
