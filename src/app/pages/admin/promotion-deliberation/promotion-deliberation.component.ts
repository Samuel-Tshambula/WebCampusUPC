import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PromotionService } from './../../../core/services/promotion.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-promotion-deliberation',
  imports: [CommonModule],
  templateUrl: './promotion-deliberation.component.html',
  styleUrl: './promotion-deliberation.component.css'
})
export class PromotionDeliberationComponent {
  private promotionService: PromotionService = inject(PromotionService);
  private router: Router = inject(Router);

  promotions: any[] = [];
  message: string | null = null;

  async ngOnInit() {
    try {
      this.promotions = await this.promotionService.getAllPromotions();
    } catch (err: any) {
      this.message = err.message || 'Erreur lors du chargement des promotions.';
    }
  }

  goToDeliberation(promotionId: string) {
    this.router.navigate(['/admin/deliberation/promotion', promotionId]);
  }
}
