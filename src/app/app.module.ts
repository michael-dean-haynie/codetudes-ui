import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { CodetudesComponent } from './components/codetudes/codetudes.component';

import { CodetudeService } from './services/codetude.service';
import { SnippetPipe } from './pipes/snippet.pipe';
import { AuthComponent } from './components/login/auth.component';
import { CodetudeDetailComponent } from './components/codetude-detail/codetude-detail.component';
import { TagComponent } from './components/tag/tag.component';
import { TagSelectorComponent } from './components/tag-selector/tag-selector.component';
import { AuthService } from './services/auth.service';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { TagsComponent } from './components/tags/tags.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CodetudeFilterComponent } from './components/codetude-filter/codetude-filter.component';
import { FilterFacetComponent } from './components/filter-facet/filter-facet.component';
import { AppStateService } from './services/app-state.service';
import { TagManagerComponent } from './components/tag-manager/tag-manager.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { CircleButtonComponent } from './components/circle-button/circle-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilterFacetService } from './services/filter-facet.service';
import { CodetudeGridComponent } from './components/codetude-grid/codetude-grid.component';
import { CodetudeTableComponent } from './components/codetude-table/codetude-table.component';
import { SortIconsComponent } from './components/sort-icons/sort-icons.component';
import { CodetudeSortingService } from './services/codetude-sorting.service';
import { TagSortingService } from './services/tag-sorting.service';
import { BackgroundImagePipe } from './pipes/background-image.pipe';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'about', component: AboutComponent },
  { path: 'codetudes', component: CodetudesComponent },
  { path: 'codetudes/:id', component: CodetudeDetailComponent },
  { path: 'tags', component: TagsComponent, canActivate: [AuthGuardService] },

  {
    path: '',
    redirectTo: 'codetudes',
    pathMatch: 'full',
  } /*,
  { path: '**', component: PageNotFoundComponent }*/,
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CodetudesComponent,
    SnippetPipe,
    AuthComponent,
    CodetudeDetailComponent,
    TagComponent,
    TagSelectorComponent,
    TagsComponent,
    CodetudeFilterComponent,
    FilterFacetComponent,
    TagManagerComponent,
    BackButtonComponent,
    CircleButtonComponent,
    ModalComponent,
    CodetudeGridComponent,
    CodetudeTableComponent,
    SortIconsComponent,
    BackgroundImagePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true,
      } /*,
      { enableTracing: true } // <-- debugging purposes only*/
    ),
    FormsModule,
  ],
  providers: [
    CodetudeService,
    AppStateService,
    FilterFacetService,
    CodetudeSortingService,
    TagSortingService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
