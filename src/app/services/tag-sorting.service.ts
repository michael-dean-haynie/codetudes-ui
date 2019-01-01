import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagSortingService {
  constructor() {}

  sortTags(tags: Tag[]): Tag[] {
    return tags.sort((a, b) => {
      const aVal = a.name.toLowerCase();
      const bVal = b.name.toLowerCase();

      let result = 0;
      if (aVal < bVal) {
        result = -1;
      }
      if (aVal > bVal) {
        result = 1;
      }

      return result;
    });
  }
}
