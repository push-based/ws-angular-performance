import { RouterModule, Routes } from '@angular/router';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { MovieListPageModule } from './pages/movie-list-page/movie-list-page.module';

const ROUTES: Routes = [
  // Exercise 2: Replace this 2 routes
  {
    path: 'list-category/:category',
    component: MovieListPageComponent,
  },
  {
    path: 'list-genre/:genre',
    component: MovieListPageComponent,
  },
  {
    path: 'detail/movie/:identifier',
    loadChildren: () =>
      import(
        'projects/movies/src/app/pages/movie-detail-page/movie-detail-page.module'
      ).then((m) => m.MovieDetailPageModule),
  },
  {
    path: 'detail/list/:identifier',
    loadChildren: () =>
      import(
        'projects/movies/src/app/pages/account-feature/list-detail-page/list-detail-page.module'
      ).then((m) => m.ListDetailsPageModule),
  },
  {
    path: 'detail/person/:identifier',
    loadChildren: () =>
      import(
        'projects/movies/src/app/pages/person-detail-page/person-detail-page.module'
      ).then((m) => m.PersonDetailPageModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import(
        'projects/movies/src/app/pages/account-feature/account-list-page/account-list-page.module'
      ).then((m) => m.AccountListPageModule),
  },
  {
    path: 'page-not-fount',
    loadChildren: () =>
      import(
        'projects/movies/src/app/pages/not-found-page/not-found-page.module'
      ).then((m) => m.NotFoundPageModule),
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];

export const ROUTING_IMPORTS = [
  MovieListPageModule,
  RouterModule.forRoot(ROUTES, {
    enableTracing: false,

    // Exercise 2: Disable route initial navigation here.

    /**
     * **💡 UX Tip for InfiniteScroll:**
     *
     * Reset scroll position to top on route change, users could be
     * irritated starting a new list from the bottom of the page.
     *
     * also: otherwise infinite scroll isn't working properly
     */
    scrollPositionRestoration: 'top',
  }),
];
