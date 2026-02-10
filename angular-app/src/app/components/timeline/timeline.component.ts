import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FormationItem {
  formation: string;
  description: string;
  date: string;
  mention: string;
}

interface FormationResponse {
  formations: FormationItem[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  formations: FormationItem[] = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<FormationResponse>('/data/formation.json').subscribe({
      next: (data) => {
        this.formations = data.formations ?? [];
      },
      error: (error) => {
        console.error('[+] Erreur chargement formations :', error);
      }
    });
  }
}
