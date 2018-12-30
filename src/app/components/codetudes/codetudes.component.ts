import { CodetudesDisplayMode } from './../../enums/codetudes-display-mode';
import { FilterStateService } from './../../services/filter-state.service';
import { Component, OnInit } from '@angular/core';

import { Codetude } from '../../models/codetude.model';

import { CodetudeService } from '../../services/codetude.service';
import { AuthService } from '../../services/auth.service';
import { FilterFacet } from '../../models/filter-facet.model';
import { FilterFacetMode } from '../../enums/fitter-facet-mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codetudes',
  templateUrl: './codetudes.component.html',
  styleUrls: ['./codetudes.component.css'],
})
export class CodetudesComponent implements OnInit {
  displayedCodetudes: Codetude[] = [];
  appliedFacets: FilterFacet[] = [];
  CodetudesDisplayMode = CodetudesDisplayMode;
  codetudesDisplayMode: CodetudesDisplayMode = CodetudesDisplayMode.Grid;
  currentFilterFacetMode: FilterFacetMode = FilterFacetMode.And;

  constructor(
    private codetudeService: CodetudeService,
    private filterStateService: FilterStateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.codetudeService.findAll().subscribe((codetudes: Codetude[]) => {
      this.filterStateService.allCodetudes = codetudes;
      this.updateDisplayedCodetudes();
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
    this.currentFilterFacetMode = mode;
    this.updateDisplayedCodetudes();
  }

  setCodetudesDisplayMode(mode: CodetudesDisplayMode): void {
    this.codetudesDisplayMode = mode;
  }

  updateDisplayedCodetudes() {
    this.displayedCodetudes = [];

    // First, only admins (logged in users) can see non "live" codetudes
    const isAdmin = this.userIsLoggedIn();
    const visibleCodetudes = this.filterStateService.allCodetudes.filter(
      codetude => (isAdmin ? true : codetude.live)
    );

    visibleCodetudes.forEach(codetude => {
      let meetsAllCriteria = true; // default

      // All applied facets must match (unless there aren't any facets)
      if (this.currentFilterFacetMode === FilterFacetMode.And) {
        meetsAllCriteria =
          !this.appliedFacets.length ||
          this.appliedFacets.every(facet => {
            return codetude.matchesFacet(facet);
          });
      }

      // At least one applied facet must match (unless there aren't any facets)
      if (this.currentFilterFacetMode === FilterFacetMode.Or) {
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
  }
}
