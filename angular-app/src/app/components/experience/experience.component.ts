import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ExperienceCompetence {
  src: string;
  alt: string;
}

interface ExperienceItem {
  poste: string;
  entreprise: string;
  link: string;
  img: string;
  mission: string;
  competences: ExperienceCompetence[];
}

interface ExperienceResponse {
  experiences: ExperienceItem[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  experiences: ExperienceItem[] = [];

  @ViewChildren('logoTrack') logoTracks!: QueryList<ElementRef<HTMLElement>>;
  private slidersInitialized = false;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ExperienceResponse>('/data/experience.json').subscribe({
      next: (data) => {
        this.experiences = data.experiences ?? [];
        setTimeout(() => this.initSliders());
      },
      error: (error) => {
        console.error('[-] Erreur chargement expériences :', error);
      }
    });
  }

  private initSliders(): void {
    if (this.slidersInitialized) {
      return;
    }
    const tracks = this.logoTracks?.toArray() ?? [];
    if (tracks.length === 0) {
      return;
    }

    requestAnimationFrame(() => {
      tracks.forEach((trackRef) => this.setupTrack(trackRef.nativeElement));
      this.slidersInitialized = true;
    });
  }

  private setupTrack(track: HTMLElement): void {
    if (track.dataset['cloned'] === 'true') {
      return;
    }

    const slider = track.parentElement as HTMLElement | null;
    const trackWidth = track.scrollWidth;
    const parentWidth = slider?.offsetWidth ?? 0;

    if (trackWidth <= parentWidth) {
      track.style.animation = 'none';
      return;
    }

    const logos = Array.from(track.querySelectorAll('.logo'));
    logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });

    track.style.width = `${trackWidth * 2}px`;
    track.dataset['cloned'] = 'true';
  }
}
