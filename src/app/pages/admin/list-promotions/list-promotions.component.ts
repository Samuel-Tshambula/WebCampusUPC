import { PromotionItem } from './../../../core/models/promotion';
import { NgFor, CommonModule } from '@angular/common';
import { PromotionService } from './../../../core/services/promotion.service';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-promotions',
  imports: [RouterLink, NgFor, CommonModule],
  templateUrl: './list-promotions.component.html',
  styleUrl: './list-promotions.component.css'
})
export class ListPromotionsComponent {
  promotionService: PromotionService = inject(PromotionService);
  promotions: PromotionItem[] = [];
  message: string | null = null;
  isError = false;

  async ngOnInit() {
  try {
    this.promotions = await this.promotionService.getAllPromotions();
  } catch (err: any) {
    this.isError = true;
    this.message = err.message || 'Erreur de chargement';
  }
}


  async deletePromotion(id: string) {
    if (!confirm('Confirmer la suppression ?')) return;

    try {
      const res = await this.promotionService.deletePromotion(id);
      this.promotions = this.promotions.filter(p => p._id !== id);
      this.message = res.message;
      this.isError = false;
    } catch (err: any) {
      this.message = err.message || 'Erreur lors de la suppression';
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
