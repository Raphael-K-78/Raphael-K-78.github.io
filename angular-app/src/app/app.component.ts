import { Component } from '@angular/core';
import { BackgroundComponent } from './components/background/background.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { PointerCircleComponent } from './components/pointer-circle/pointer-circle.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BackgroundComponent,
    ExperienceComponent,
    PointerCircleComponent,
    ProgressBarComponent,
    ProjectsComponent,
    TimelineComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
