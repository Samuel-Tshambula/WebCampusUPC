import { AuthService } from './../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { Component, AfterViewInit, inject } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';  // importer la directive standalone

@Component({
  selector: 'app-home',
  imports: [RouterLink, LottieComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  private statsService: AuthService = inject(AuthService);

  students = 0;
  teachers = 0;
  tps = 0;
  promotions = 0;

  async ngAfterViewInit(): Promise<void> {
    try {
      const stats = await this.statsService.getStats();
      this.students = stats.studentsConnected;
      this.teachers = stats.teachers;
      this.tps = stats.tpsPublished;
      this.promotions = stats.activePromotions;
    } catch (error) {
      console.error('Erreur stats :', error);
    }
  }

}
