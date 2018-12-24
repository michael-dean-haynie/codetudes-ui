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
import { LoginComponent } from './components/login/login.component';
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
import { FilterStateService } from './services/filter-state.service';

const appRoutes: Routes = [
  { path: 'auth', component: LoginComponent },
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
    LoginComponent,
    CodetudeDetailComponent,
    TagComponent,
    TagSelectorComponent,
    TagsComponent,
    CodetudeFilterComponent,
    FilterFacetComponent,
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
    FilterStateService,
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
