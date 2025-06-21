import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Promotion, PromotionItem } from './../../../core/models/promotion';
import { PromotionService } from './../../../core/services/promotion.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-promotion-horaire',
  imports: [RouterLink, CommonModule],
  templateUrl: './promotion-horaire.component.html',
  styleUrl: './promotion-horaire.component.css'
})
export class PromotionHoraireComponent {
  private promoService: PromotionService = inject(PromotionService);
  promotions: PromotionItem[] = [];
  message: string | null = null;

  async ngOnInit() {
    try {
      this.promotions = await this.promoService.getAllPromotions();
    } catch (err) {
      this.message = 'Erreur lors du chargement des promotions';
    }
  }
}
