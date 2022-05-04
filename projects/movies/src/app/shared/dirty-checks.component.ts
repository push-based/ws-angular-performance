import { Component, ElementRef, NgModule } from '@angular/core';

@Component({
  selector: 'dirty-checks',
  template: ` <code class="dirty-checks">({{ renders() }})</code> `,
})
export class DirtyChecksComponent {
  private _renders = 0;

  constructor(private elem: ElementRef) {}

  renders() {
    this.elem.nativeElement.children[0].innerHTML = ++this._renders;
  }
}

@NgModule({
  declarations: [DirtyChecksComponent],
  exports: [DirtyChecksComponent],
})
export class DirtyChecksComponentModule {}
