import { FilterFacetType } from '../enums/filter-facet-type';

export class FilterFacet {
  type: FilterFacetType;
  value: string;

  constructor(type: FilterFacetType, value: string) {
    this.type = type;
    this.value = value;
  }

  sameAs(other: FilterFacet): boolean {
    if (other === null) {
      return false;
    }
    return this.type === other.type && this.value === other.value;
  }
}
