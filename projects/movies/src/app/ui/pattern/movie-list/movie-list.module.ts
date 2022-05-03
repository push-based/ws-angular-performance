import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IfModule } from '../../../shared/rxa-custom/if/src/index';
import { GridListModule } from '../../component/grid-list/grid-list.module';
import { SvgIconModule } from '../../component/icons/icon.module';
import { MovieListComponent } from './movie-list.component';
import { StarRatingModule } from '../star-rating/star-rating.module';
import { ElementVisibilityModule } from '../../../shared/cdk/element-visibility/element-visibility.module';

// Exercise 6: Add ForModule & LetModule imports here

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    RouterModule,
    StarRatingModule,
    ElementVisibilityModule,
    SvgIconModule,
    GridListModule,
    IfModule,

    // Exercise 6: Add ForModule & LetModule
  ],
  exports: [MovieListComponent],
})
export class MovieListModule {}
