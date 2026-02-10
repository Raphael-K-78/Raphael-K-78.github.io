import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pointer-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pointer-circle.component.html',
  styleUrl: './pointer-circle.component.scss'
})
export class PointerCircleComponent implements AfterViewInit {
  @ViewChild('circle', { static: true }) circleRef!: ElementRef<HTMLDivElement>;

  leftPx = '0px';
  topPx = '0px';

  ngAfterViewInit(): void {
    const circle = this.circleRef.nativeElement;
    this.leftPx = `${-circle.offsetWidth}px`;
    this.topPx = `${-circle.offsetHeight}px`;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const circle = this.circleRef?.nativeElement;
    if (!circle) {
      return;
    }
    this.leftPx = `${event.clientX - circle.offsetWidth / 2}px`;
    this.topPx = `${event.clientY - circle.offsetHeight / 2}px`;
  }
}
