import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements OnInit {
  filterString: string;

  @Input() modelTags: Tag[];
  allTags: Tag[];
  

  
  constructor() { }

  ngOnInit() {
  }

}
