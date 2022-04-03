import {Directive, HostListener, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[notMobile]'
})
export class NotMobileDirective {

  hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
    this.changeStructure();
  }

  @HostListener("window:resize", [])
  onResize() {
    this.changeStructure()
  }

  private changeStructure() {
    const isNotMobile = !this.getIsMobile();
    if (isNotMobile && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isNotMobile && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  private getIsMobile(): boolean {
    const width = document.documentElement.clientWidth;
    return width < 992;
  }

}
