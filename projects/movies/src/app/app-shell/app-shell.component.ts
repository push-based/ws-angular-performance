import { RxState } from '@rx-angular/state';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';
import { RxActionFactory } from '../shared/rxa-custom/actions';
import { RouterState } from '../shared/router/router.state';
import { getIdentifierOfTypeAndLayout } from '../shared/state/utils';
import { GenreResource } from '../data-access/api/resources/genre.resource';
import { RxEffects } from '@rx-angular/state/effects';

// Exercise 2: Add fallback util import here

// Exercise 3: Add TMDBMovieGenreModel import here

// Exercise 4: Add setTimeout import here

type Actions = {
  sideDrawerOpenToggle: boolean;
  loadAccountMenu: void;
};

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [RxState, RxEffects, RxActionFactory],
})
export class AppShellComponent {
  readonly ui = this.actionsF.create();

  search$ = this.routerState.select(
    getIdentifierOfTypeAndLayout('search', 'list')
  );

  accountMenuComponent$ = this.ui.loadAccountMenu$.pipe(
    switchMap(() =>
      import('./account-menu/account-menu.component.lazy').then(({ c }) => c)
    ),
    shareReplay(1)
  );

  constructor(
    private readonly state: RxState<{
      sideDrawerOpen: boolean;
    }>,
    public effects: RxEffects,
    public routerState: RouterState,
    private router: Router,
    private actionsF: RxActionFactory<Actions>,
    private genreResource: GenreResource
  ) {
    this.init();

    // Exercise 2: Schedule initial navigation here
  }

  init() {
    this.state.set({ sideDrawerOpen: false });
    this.state.connect('sideDrawerOpen', this.ui.sideDrawerOpenToggle$);

    this.effects.register(
      this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => (e as NavigationEnd).urlAfterRedirects),
        distinctUntilChanged()
      ),
      () => this.closeSidenav()
    );
  }

  readonly genres$ = this.genreResource.getGenresCached();

  readonly viewState$ = this.state.select();

  // Exercise 3: Create trackBy function here

  searchMovie(term: string) {
    term === ''
      ? this.router.navigate(['list/category/popular'])
      : this.router.navigate([`list/search/${term}`]);
  }

  closeSidenav = () => {
    this.ui.sideDrawerOpenToggle(false);
  };
}
