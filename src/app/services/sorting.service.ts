import { SortableFields } from './../enums/sortable-fields';
import { SortMode } from 'src/app/enums/sort-mode';
import { Injectable } from '@angular/core';
import { Codetude } from '../models/codetude.model';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  constructor() {}

  sortCodetudes(
    codetudes: Codetude[],
    sortField: SortableFields,
    sortMode: SortMode
  ): Codetude[] {
    return codetudes.sort((a, b) => {
      // get compare values
      const aVal = this.getCompareValueGetter(sortField)(a);
      const bVal = this.getCompareValueGetter(sortField)(b);

      // do comparison
      let result = 0;
      if (aVal < bVal) {
        result = -1;
      }
      if (aVal > bVal) {
        result = 1;
      }

      // flip result if sortmode is descending
      if (sortMode === SortMode.Descending) {
        result = result * -1;
      }

      return result;
    });
  }

  // can't believe this works
  private getCompareValueGetter(sortField: SortableFields) {
    switch (sortField) {
      case SortableFields.Title: {
        return this.getTitleCompareValue;
      }
      case SortableFields.Subtitle: {
        return this.getSubtitleCompareValue;
      }
      case SortableFields.Date: {
        return this.getDateCompareValue;
      }
    }
  }

  private getTitleCompareValue(codetude: Codetude): string {
    return codetude.title ? codetude.title.toLowerCase() : null;
  }

  private getSubtitleCompareValue(codetude: Codetude): string {
    return codetude.subtitle ? codetude.subtitle.toLowerCase() : null;
  }

  private getDateCompareValue(codetude: Codetude): number {
    return codetude.finished ? codetude.finished.valueOf() : null;
  }
}
