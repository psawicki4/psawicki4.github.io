import {Directive, HostListener, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[mobileOnly]'
})
export class MobileOnlyDirective {

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
    const isMobile = this.getIsMobile();
    if (isMobile && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isMobile && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  private getIsMobile(): boolean {
    const width = document.documentElement.clientWidth;
    return width < 992;
  }
}
