import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
} from 'rxjs';
import { RouterState } from '../shared/router/router.state';
import { getIdentifierOfTypeAndLayout } from '../shared/state/utils';
import { GenreResource } from '../data-access/api/resources/genre.resource';
import { RxEffects } from '@rx-angular/state/effects';

// Exercise 2: Add fallback util import here

// Exercise 3: Add TMDBMovieGenreModel import here

// Exercise 4: Add setTimeout import here

// Exercise 7: Add RxState import here

// Exercise 7: Add RxActionFactory import here

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,

  // Exercise 7: Add RxState and RxActionFactory here

  providers: [RxEffects],
})
export class AppShellComponent {
  // Exercise 7: Create ui actions here

  search$ = this.routerState.select(
    getIdentifierOfTypeAndLayout('search', 'list')
  );

  readonly genres$ = this.genreResource.getGenresCached();

  // Exercise 7: Remove state$

  private readonly state$ = new BehaviorSubject<{ sideDrawerOpen: boolean }>({
    sideDrawerOpen: false,
  });

  // Exercise 7: Replace it with state.select()

  readonly viewState$ = this.state$.pipe(
    distinctUntilChanged((o, n) => o.sideDrawerOpen === n.sideDrawerOpen),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    // Exercise 7: Add RxState here

    // Exercise 7: Add RxActionFactory here

    public effects: RxEffects,
    public routerState: RouterState,
    private router: Router,
    private genreResource: GenreResource
  ) {
    this.init();

    // Exercise 2: Schedule initial navigation here
  }

  init() {
    // Exercise 7: initialize state here

    // Exercise 7: connect ui here

    this.effects.register(
      this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => (e as NavigationEnd).urlAfterRedirects),
        distinctUntilChanged()
      ),

      // Exercise 7: replace with ui action

      () => this.closeSidenav()
    );
  }

  // Exercise 3: Create trackBy function here

  searchMovie(term: string) {
    term === ''
      ? this.router.navigate(['list/category/popular'])
      : this.router.navigate([`list/search/${term}`]);
  }

  // Exercise 7: remove this function

  closeSidenav = () => {
    this.state$.next({
      sideDrawerOpen: false,
    });
  };

  // Exercise 7: remove this function

  sideDrawerOpenToggle = (sideDrawerOpen: boolean) => {
    this.state$.next({
      sideDrawerOpen,
    });
  };
}
