import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggableScroll]'
})
export class DraggableScrollDirective {
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.pageX - this.el.nativeElement.offsetLeft;
    this.scrollLeft = this.el.nativeElement.scrollLeft;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isDragging = false;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.el.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5; 
    this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
