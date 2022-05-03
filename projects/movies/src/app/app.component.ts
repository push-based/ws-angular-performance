import { Component } from '@angular/core';
// Exercise 5: Import zone-less routing

// Exercise 3: Set app component CD to OnPush

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <router-outlet></router-outlet>
    </app-shell>
  `,
})
export class AppComponent {
  // Exercise 5: Use zone-less routing
}
