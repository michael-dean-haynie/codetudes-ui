import { FilterFacetService } from 'src/app/services/filter-facet.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterFacet } from 'src/app/models/filter-facet.model';
import { FilterFacetType } from 'src/app/enums/filter-facet-type';
import { min } from 'rxjs/internal/operators';

@Component({
  selector: 'app-filter-facet',
  templateUrl: './filter-facet.component.html',
  styleUrls: ['./filter-facet.component.css'],
})
export class FilterFacetComponent implements OnInit {
  @Input() model: FilterFacet;

  @Output() click = new EventEmitter<FilterFacet>();

  matchCount = null;

  FilterFacetType = FilterFacetType;

  constructor(private filterFacetService: FilterFacetService) {}

  ngOnInit() {
    this.filterFacetService
      .getMatchCountForFilterFacet(this.model)
      .subscribe(matchCount => {
        this.matchCount = matchCount;
        console.log(this.matchCount);
      });
  }

  onClick(): void {
    this.click.emit(this.model);
  }
}
