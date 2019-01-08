import { TagSortingService } from './../../services/tag-sorting.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditableCodetude } from '../../models/editable-codetude.model';
import { CodetudeService } from '../../services/codetude.service';
import { Codetude } from '../../models/codetude.model';
import { Tag } from '../../models/tag.model';
import { AuthService } from '../../services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-codetude-detail',
  templateUrl: './codetude-detail.component.html',
  styleUrls: ['./codetude-detail.component.css'],
})
export class CodetudeDetailComponent implements OnInit {
  // to stop weird errors in template
  model: EditableCodetude = new EditableCodetude(new Codetude({}));
  userCanEdit = false;
  startedIsInEditMode = false;
  fieldChangedSubject = new Subject<Event>();

  @ViewChild('startedInput') startedInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private codetudeService: CodetudeService,
    private authService: AuthService,
    private tagSortingService: TagSortingService,
    private imageService: ImageService,
    private router: Router,
    private changeDectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userCanEdit = this.authService.userIsLoggedIn();
    this.fetchCodetude();

    // pipe debounce and subscribe to fieldChangedSubject
    this.fieldChangedSubject.pipe(debounceTime(2000)).subscribe(event => {
      this.saveChanges(this.model.src);
    });
  }

  onFieldChanged(event: Event) {
    this.fieldChangedSubject.next(event);
  }

  toggleEditMode(): void {
    this.model.isInEditMode = !this.model.isInEditMode;
  }

  onTagAdded(tag: Tag): void {
    const newCodetude = JSON.parse(JSON.stringify(this.model.src)); // copy
    newCodetude.tags.push(tag); // add tag
    this.saveChanges(newCodetude);
  }

  onTagRemoved(tag: Tag): void {
    const newCodetude = JSON.parse(JSON.stringify(this.model.src)); // copy
    newCodetude.tags = newCodetude.tags.filter(t => {
      return t.id !== tag.id;
    }); // remove tag
    this.saveChanges(newCodetude);
  }

  delete(): void {
    this.codetudeService.delete(this.model.src.id).subscribe((id: number) => {
      this.router.navigateByUrl('/codetudes');
    });
  }

  inEditMode(): boolean {
    return this.model && this.model.isInEditMode;
  }

  navigateToLiveDemoLink(): void {
    window.location.href = this.model.src.liveDemoLink;
  }

  navigateToSourceCodeLink(): void {
    window.location.href = this.model.src.sourceCodeLink;
  }

  onPreviewClicked(): void {
    if (!this.inEditMode()) {
      this.navigateToLiveDemoLink();
    }
  }

  onSourceCodeClicked(): void {
    if (!this.inEditMode()) {
      this.navigateToSourceCodeLink();
    }
  }

  onPreviewImageInputChange(event: Event): void {
    // try to access file
    if (event.target['files'] && event.target['files'].length > 0) {
      const reader = new FileReader();
      const file = event.target['files'][0];
      event.target['value'] = ''; // empty file input
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updatePreviewImage(new Image({ value: <string>reader.result }));
      };
    }
  }

  onRemovePreviewImage(): void {
    this.updatePreviewImage(null);
  }

  // first delete current image (if exists)
  // then create new one (if there's one to create)
  // then update local model
  // just messing around with observables and closures
  updatePreviewImage(newImage: Image): void {
    const deleteExisting = (): Observable<number> => {
      if (this.model.src.previewImageId) {
        return this.imageService.delete(this.model.src.previewImageId);
      } else {
        return of(null);
      }
    };

    const addNew = (): Observable<Image> => {
      if (newImage) {
        return this.imageService.create(newImage);
      } else {
        return of(null);
      }
    };

    const updateLocalModel = (image: Image): void => {
      this.model.src.previewImageId = image ? image.id : null;
      this.saveChanges(this.model.src);
    };

    deleteExisting().subscribe(() => {
      addNew().subscribe(addedImage => {
        updateLocalModel(addedImage);
      });
    });
  }

  onDeleteCodetudeModalDidConfirm(didConfirm: boolean) {
    if (didConfirm) {
      this.delete();
    }
  }

  toggleLive(): void {
    this.model.src.live = !this.model.src.live;
    this.saveChanges(this.model.src);
  }

  onStartedEdit(): void {
    this.startedIsInEditMode = true;
    // enable imediately otherwise the focus doesn't work;
    this.startedInput.nativeElement.disabled = false;
    this.startedInput.nativeElement.focus();
  }

  onStartedAccept(): void {
    this.startedIsInEditMode = false;
    this.model.src.started = moment.utc(
      this.startedInput.nativeElement['value']
    );
    this.saveChanges(this.model.src);
  }

  onStartedCancel(): void {
    // trigger change detection to reload formatted date via pipe in template
    const previousValue = this.model.src.started;
    this.model.src.started = moment.utc();
    this.changeDectorRef.detectChanges();
    this.model.src.started = previousValue;
    this.startedIsInEditMode = false;
  }

  private fetchCodetude(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.codetudeService.findOne(id).subscribe((codetude: Codetude) => {
      this.model = new EditableCodetude(codetude);
      this.sortTags();
      this.model.isInEditMode =
        this.route.snapshot.queryParams['edit'] === 'true';
    });
  }

  private saveChanges(codetude: Codetude): void {
    this.codetudeService.update(codetude).subscribe((ct: Codetude) => {
      this.model.src = ct;
      this.sortTags();
    });
  }

  private sortTags(): void {
    this.model.src.tags = this.tagSortingService.sortTags(this.model.src.tags);
  }
}
