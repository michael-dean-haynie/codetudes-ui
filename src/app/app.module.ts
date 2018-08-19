import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { CodetudesComponent } from './components/codetudes/codetudes.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'codetudes', component: CodetudesComponent },
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
    CodetudesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes/*,
      { enableTracing: true } // <-- debugging purposes only*/
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
