import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { CodetudesComponent } from './components/codetudes/codetudes.component';

import { CodetudeService } from './services/codetude.service';
import { SnippetPipe } from './pipes/snippet.pipe';
import { LoginComponent } from './components/login/login.component';
import { CodetudeDetailComponent } from './components/codetude-detail/codetude-detail.component';
import { TagComponent } from './components/tag/tag.component';
import { TagSelectorComponent } from './components/tag-selector/tag-selector.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent },
  { path: 'codetudes', component: CodetudesComponent },
  { path: 'codetudes/:id', component: CodetudeDetailComponent },
  {
    path: '',
    redirectTo: 'codetudes',
    pathMatch: 'full'
  }/*,
  { path: '**', component: PageNotFoundComponent }*/
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
    TagSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes/*,
      { enableTracing: true } // <-- debugging purposes only*/
    ),
    FormsModule
  ],
  providers: [
    CodetudeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
