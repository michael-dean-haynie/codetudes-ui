import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Tag } from '../../models/tag.model';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements OnInit, OnChanges{
  filterValue: string = "";

  @Input() tagsOnCodetude: Tag[] = [];
  allTags: Tag[] = [];

  displayedTagsOnCodetude: Tag[] = [];
  displayedTagsNotOnCodetude: Tag[] = [];

  @Output() tagAdded = new EventEmitter<Tag>();
  @Output() tagRemoved = new EventEmitter<Tag>();

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.loadAllTags();
  }
  
  ngOnChanges() {
    this.updateDisplayedTagGroups();
  }

  onFilterChange(): void {
    this.updateDisplayedTagGroups();

  }

  addTag(tag: Tag): void {
    this.tagAdded.emit(tag);
  }

  removeTag(tag: Tag): void {
    this.tagRemoved.emit(tag);
  }



  private loadAllTags(): void {
    this.tagService.findAll().subscribe((tags: Tag[]) => {
      this.allTags = tags;
      this.updateDisplayedTagGroups();
    });
  }

  private updateDisplayedTagGroups(): void {
    this.displayedTagsOnCodetude = [];
    this.displayedTagsNotOnCodetude = [];

    this.allTags.forEach(tag => {
      const tagIsWithinFilter: boolean = tag.name.toLowerCase().trim().includes(this.filterValue.toLowerCase().trim());
      if(tagIsWithinFilter || !this.filterValue.length) {

        const tagIsAlreadyOnCodetude: boolean = this.tagsOnCodetude.filter(t => {return t.id === tag.id;}).length > 0;
        if(tagIsAlreadyOnCodetude){
          this.displayedTagsOnCodetude.push(tag);
        }
        else {
          this.displayedTagsNotOnCodetude.push(tag);
        }
      }
    });
  }

}
