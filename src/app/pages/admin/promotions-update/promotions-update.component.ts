import { FaculteAll } from './../../../core/models/faculte';
import { Section } from './../../../core/models/section';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { SectionService } from './../../../core/services/section.service';
import { PromotionService } from './../../../core/services/promotion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-promotions-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './promotions-update.component.html',
  styleUrl: './promotions-update.component.css'
})
export class PromotionsUpdateComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  promotionService: PromotionService = inject(PromotionService);
  sectionService: SectionService = inject(SectionService);

  promotionForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    faculty: new FormControl('', Validators.required)
  });

  message: string | null = null;
  isOpen = false;
  isError = false;

  sectionList: Section[] = [];
  faculteList: FaculteAll[] = [];

  async ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) return;

  try {
    // Charger les listes d'abord
    this.sectionList = await this.sectionService.getAllSections();
    this.faculteList = await this.promotionService.faculteAll();

    // Puis la promotion
    const promo = await this.promotionService.getPromotionById(id);

    // Remplir le formulaire
    this.promotionForm.patchValue({
      nom: promo.nom || '',
      section: promo.section?._id || '',
      faculty: promo.faculty?._id || ''
    });

  } catch (err: any) {
    this.isError = true;
    this.message = err.message || 'Erreur lors du chargement des données.';
  }
}

  async submitPromotion() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    try {
      const { nom, section, faculty } = this.promotionForm.value;
      const res = await this.promotionService.updatePromotion(id, nom!, section!, faculty!);
      this.message = res.message || 'Promotion mise à jour avec succès';
      this.isOpen = true;
    } catch (err: any) {
      this.message = err.message || 'Erreur lors de la mise à jour';
      this.isError = true;
    }
  }

  close() {
    this.isOpen = false;
    this.isError = false;
    this.message = null;
  }
}
