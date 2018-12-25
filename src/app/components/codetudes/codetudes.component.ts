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
import { Router } from '@angular/router';

@Component({
  selector: 'app-codetudes',
  templateUrl: './codetudes.component.html',
  styleUrls: ['./codetudes.component.css'],
})
export class CodetudesComponent implements OnInit {
  allCodetudes: Codetude[] = [];
  displayedCodetudes: Codetude[] = [];
  appliedFacets: FilterFacet[] = [];
  currentFilterFacetMode: FilterFacetMode = FilterFacetMode.And;

  constructor(
    private codetudeService: CodetudeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.codetudeService.findAll().subscribe((codetudes: Codetude[]) => {
      this.allCodetudes = codetudes;
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

  updateDisplayedCodetudes() {
    this.displayedCodetudes = [];

    // First, only admins (logged in users) can see non "live" codetudes
    const isAdmin = this.userIsLoggedIn();
    const visibleCodetudes = this.allCodetudes.filter(codetude =>
      isAdmin ? true : codetude.live
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
