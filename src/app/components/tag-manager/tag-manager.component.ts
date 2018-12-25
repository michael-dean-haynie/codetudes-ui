import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.css'],
})
export class TagManagerComponent implements OnInit, AfterViewChecked {
  @Input() model: Tag;

  @Output() tagDeleted = new EventEmitter<number>();

  @ViewChild('tagManagerInput') tagManagerInput: ElementRef;

  private originalModel: Tag;
  editMode = false;
  focusOnInputFlag = false; //

  constructor(private tagService: TagService) {}

  ngOnInit() {
    // stash a copy for discarding changes
    this.originalModel = { ...this.model };
  }

  ngAfterViewChecked() {
    if (this.focusOnInputFlag) {
      this.tagManagerInput.nativeElement.focus();
      this.focusOnInputFlag = false;
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.focusOnInputFlag = true;
    }
  }

  delete(): void {
    this.tagService.delete(this.model.id).subscribe((respId: number) => {
      this.tagDeleted.emit(respId);
    });
  }

  acceptChanges(): void {
    this.editMode = false;

    this.tagService.update(this.model).subscribe((respTag: Tag) => {
      this.model = respTag;
      // stash a copy for discarding changes
      this.originalModel = { ...respTag };
    });
  }

  discardChanges() {
    // apply stashed original back to working model
    this.model = { ...this.originalModel };
    this.editMode = false;
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.acceptChanges();
    }
  }

  getPlaceholder(): string {
    return `${this.originalModel.name} (previous value)`;
  }

  nameHasChanged(): boolean {
    console.log(this.model.name !== this.originalModel.name);
    return this.model.name !== this.originalModel.name;
  }
}
