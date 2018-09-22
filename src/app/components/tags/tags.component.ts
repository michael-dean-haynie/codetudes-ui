import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  // model: 

  constructor(private tagService: TagService) { }

  ngOnInit() {

  }

}
