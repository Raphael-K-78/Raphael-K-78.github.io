import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) scrollContainer!: HTMLElement;

  progress = 0;
  private scrollSub?: Subscription;

  ngAfterViewInit(): void {
    this.attachScrollListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scrollContainer']) {
      this.attachScrollListener();
    }
  }

  ngOnDestroy(): void {
    this.scrollSub?.unsubscribe();
  }

  private attachScrollListener(): void {
    if (!this.scrollContainer) {
      return;
    }

    this.scrollSub?.unsubscribe();
    this.scrollSub = fromEvent(this.scrollContainer, 'scroll').subscribe(() => {
      this.updateProgress();
    });

    this.updateProgress();
  }

  private updateProgress(): void {
    const scrollTop = this.scrollContainer.scrollTop;
    const docHeight = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
    this.progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  }
}
