import { TagSortingService } from './../../services/tag-sorting.service';
import { CodetudesDisplayMode } from './../../enums/codetudes-display-mode';
import { AppStateService } from '../../services/app-state.service';
import { Component, OnInit } from '@angular/core';

import { Codetude } from '../../models/codetude.model';

import { CodetudeService } from '../../services/codetude.service';
import { AuthService } from '../../services/auth.service';
import { FilterFacet } from '../../models/filter-facet.model';
import { FilterFacetMode } from '../../enums/fitter-facet-mode';
import { Router } from '@angular/router';
import { CodetudeSortingService } from 'src/app/services/codetude-sorting.service';

@Component({
  selector: 'app-codetudes',
  templateUrl: './codetudes.component.html',
  styleUrls: ['./codetudes.component.css'],
})
export class CodetudesComponent implements OnInit {
  displayedCodetudes: Codetude[] = [];
  appliedFacets: FilterFacet[] = [];
  CodetudesDisplayMode = CodetudesDisplayMode;
  codetudesDisplayMode: CodetudesDisplayMode = null;
  filterFacetMode: FilterFacetMode = FilterFacetMode.And;
  loading = true;
  matchCountTotal = 0;

  constructor(
    private codetudeService: CodetudeService,
    private appStateService: AppStateService,
    private codetudeSortingService: CodetudeSortingService,
    private tagSortingService: TagSortingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.codetudesDisplayMode = this.appStateService.codetudesDisplayMode;
    this.getCodetudes();
  }

  getCodetudes(): void {
    this.codetudeService.findAll().subscribe((codetudes: Codetude[]) => {
      // sort tags on codetudes
      codetudes.forEach(codetude => {
        codetude.tags = this.tagSortingService.sortTags(codetude.tags);
      });

      // cache
      this.appStateService.allCodetudes = codetudes;

      // display
      this.updateDisplayedCodetudes();
      this.loading = false;
    });
  }

  userIsLoggedIn(): boolean {
    return this.authService.userIsLoggedIn();
  }

  navigateToTags(): void {
    this.router.navigateByUrl('/tags');
  }

  navigateToCodetudeDetails(codetude: Codetude): void {
    this.router.navigateByUrl(codetude.buildDetailsPath());
  }

  createNewCodetude(): void {
    // create blank new codetude in db and navigate to the details page
    const newCodetude = new Codetude({});
    this.codetudeService.create(newCodetude).subscribe((codetude: Codetude) => {
      this.router.navigateByUrl(`/codetudes/${codetude.id}?edit=true`);
    });
  }

  onAppliedFacetsChanged(appliedFacets: FilterFacet[]): void {
    this.appliedFacets = appliedFacets;
    this.updateDisplayedCodetudes();
  }

  onFilterFacetModeChanged(mode: FilterFacetMode) {
    this.filterFacetMode = mode;
    this.updateDisplayedCodetudes();
  }

  setCodetudesDisplayMode(mode: CodetudesDisplayMode): void {
    this.codetudesDisplayMode = mode;
    this.appStateService.codetudesDisplayMode = mode;
  }

  updateDisplayedCodetudes() {
    this.displayedCodetudes = [];

    // First, only admins (logged in users) can see non "live" codetudes
    const isAdmin = this.userIsLoggedIn();
    const visibleCodetudes = this.appStateService.allCodetudes.filter(
      codetude => (isAdmin ? true : codetude.live)
    );
    this.matchCountTotal = visibleCodetudes.length;

    visibleCodetudes.forEach(codetude => {
      let meetsAllCriteria = true; // default

      // All applied facets must match (unless there aren't any facets)
      if (this.filterFacetMode === FilterFacetMode.And) {
        meetsAllCriteria =
          !this.appliedFacets.length ||
          this.appliedFacets.every(facet => {
            return codetude.matchesFacet(facet);
          });
      }

      // At least one applied facet must match (unless there aren't any facets)
      if (this.filterFacetMode === FilterFacetMode.Or) {
        meetsAllCriteria =
          !this.appliedFacets.length ||
          this.appliedFacets.some(facet => {
            return codetude.matchesFacet(facet);
          });
      }

      // final decision
      if (meetsAllCriteria) {
        this.displayedCodetudes.push(codetude);
      }
    });

    this.sortDisplayedCodetudes();
  }

  sortDisplayedCodetudes(): void {
    this.displayedCodetudes = this.codetudeSortingService.sortCodetudes(
      this.displayedCodetudes,
      this.appStateService.sortField,
      this.appStateService.sortMode
    );
  }

  onSortUpdated(): void {
    this.sortDisplayedCodetudes();
  }
}
