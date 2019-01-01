import { SortableFields } from './../../enums/sortable-fields';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Codetude } from 'src/app/models/codetude.model';
import { SortMode } from 'src/app/enums/sort-mode';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-codetude-table',
  templateUrl: './codetude-table.component.html',
  styleUrls: ['./codetude-table.component.css'],
})
export class CodetudeTableComponent implements OnInit {
  @Input() codetudes: Codetude[];

  @Output() codetudeClicked = new EventEmitter<Codetude>();
  @Output() sortUpdated = new EventEmitter<boolean>();

  SortMode = SortMode;
  SortableFields = SortableFields;
  sortField: SortableFields;
  sortMode: SortMode;

  constructor(private appStateService: AppStateService) {}

  ngOnInit() {
    this.updateSortState();
  }

  onCodetudeClicked(codetude: Codetude): void {
    this.codetudeClicked.emit(codetude);
  }

  updateSortState(): void {
    this.sortField = this.appStateService.getSortField();
    this.sortMode = this.appStateService.getSortMode();
  }

  onSortableColumnHeaderClicked(sortField: SortableFields): void {
    // update app state sort mode
    if (this.appStateService.getSortField() !== sortField) {
      // reset sortMode to initial value
      this.appStateService.setSortMode(SortMode.Ascending);
    } else {
      // cycle sort mode
      switch (this.appStateService.getSortMode()) {
        case SortMode.None: {
          this.appStateService.setSortMode(SortMode.Ascending);
          break;
        }
        case SortMode.Ascending: {
          this.appStateService.setSortMode(SortMode.Descending);
          break;
        }
        case SortMode.Descending: {
          this.appStateService.setSortMode(SortMode.None);
          break;
        }
      }
    }

    // update app state sort field
    this.appStateService.setSortField(sortField);

    // emmit event to reload codetudes
    this.sortUpdated.emit(true);

    // re-load local sort field and sort mode variables
    this.updateSortState();
  }
}
