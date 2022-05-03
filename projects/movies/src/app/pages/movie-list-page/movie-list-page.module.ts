import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListPageComponent } from './movie-list-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieListModule } from '../../ui/pattern/movie-list/movie-list.module';
import { IfModule } from '../../shared/rxa-custom/if/src';

// Exercise 6: Add LetModule import here

const ROUTES: Routes = [
  {
    path: '',
    component: MovieListPageComponent,
  },
];

@NgModule({
  declarations: [MovieListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MovieListModule,
    IfModule,
  ],
  exports: [MovieListPageComponent],
})
export class MovieListPageModule {}
