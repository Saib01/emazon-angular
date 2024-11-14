
import { ElementRef, Renderer2 } from '@angular/core';
import { DraggableScrollDirective } from './DraggableScrollDirective.directive';

describe('DraggableScrollDirective', () => {
  let directive: DraggableScrollDirective;
  let mockElementRef: ElementRef;
  let mockRenderer: Renderer2;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    nativeElement = document.createElement('div');
    nativeElement.style.overflow = 'scroll';
    nativeElement.scrollLeft = 0;

    mockElementRef = { nativeElement } as ElementRef;
    mockRenderer = {
      setStyle: jest.fn(),
    } as unknown as Renderer2;

    directive = new DraggableScrollDirective(mockElementRef, mockRenderer);
  });

  test('should initialize with cursor set to grab', () => {
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(mockElementRef.nativeElement, 'cursor', 'grab');
  });

  test('should set isDragging to true and initialize scrollLeft on mousedown', () => {
    const mockEvent = { pageX: 100, preventDefault: jest.fn() } as unknown as MouseEvent;
    directive.onMouseDown(mockEvent);

    expect(directive['isDragging']).toBe(true);
    expect(directive['startX']).toBe(100);
    expect(directive['scrollLeft']).toBe(0);
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(mockElementRef.nativeElement, 'cursor', 'grabbing');
  });

  test('should set isDragging to false and reset cursor on mouseup', () => {
    directive.onMouseUp();

    expect(directive['isDragging']).toBe(false);
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(mockElementRef.nativeElement, 'cursor', 'grab');
  });

  test('should set isDragging to false and reset cursor on mouseleave', () => {
    directive.onMouseLeave();

    expect(directive['isDragging']).toBe(false);
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(mockElementRef.nativeElement, 'cursor', 'grab');
  });

  test('should update scrollLeft on mousemove if dragging', () => {
    directive['isDragging'] = true;
    directive['startX'] = 100;
    directive['scrollLeft'] = 50;
    
    const mockEvent = { pageX: 150, preventDefault: jest.fn() } as unknown as MouseEvent;
    directive.onMouseMove(mockEvent);

    const expectedScrollLeft = directive['scrollLeft'] - ((150 - 100) * 1.5);
    expect(mockElementRef.nativeElement.scrollLeft).toBeCloseTo(expectedScrollLeft);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  test('should not update scrollLeft on mousemove if not dragging', () => {
    directive['isDragging'] = false;
    const mockEvent = { pageX: 150, preventDefault: jest.fn() } as unknown as MouseEvent;

    directive.onMouseMove(mockEvent);

    expect(mockElementRef.nativeElement.scrollLeft).toBe(0); 
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });
});