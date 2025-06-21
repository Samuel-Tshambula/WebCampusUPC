import { Section } from './../../../core/models/section';
import { SectionService } from './../../../core/services/section.service';
import { FaculteAll } from './../../../core/models/faculte';
import { NgIf, NgFor } from '@angular/common';
import { Promotion } from './../../../core/models/promotion';
import { PromotionService } from './../../../core/services/promotion.service';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-promotions-add',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './promotions-add.component.html',
  styleUrl: './promotions-add.component.css'
})
export class PromotionsAddComponent {
  promotionService: PromotionService = inject(PromotionService);
  sectionService: SectionService = inject(SectionService);

  isOpen = false;
  isError = false;
  message: string | null = null;

  faculteList: FaculteAll[] = [];
  sectionList: Section[] = [];

  promotionForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    faculty: new FormControl('', Validators.required)
  });

  async ngOnInit() {
    try {
      this.faculteList = await this.promotionService.faculteAll();
      this.sectionList = await this.sectionService.getAllSections();
    } catch (err: any) {
      this.isError = true;
      this.message = "Erreur lors du chargement des données";
    }
  }

  async submitPromotion() {
    try {
      const { nom, section, faculty } = this.promotionForm.value;
      const res = await this.promotionService.addPromotion(nom!, section!, faculty!);
      this.message = res.message || 'Promotion ajoutée';
      this.isOpen = true;
      this.promotionForm.reset();
    } catch (err: any) {
      this.isError = true;
      this.message = err.message || 'Erreur lors de l’ajout';
    }
  }

  close() {
    this.isOpen = false;
    this.isError = false;
    this.message = null;
  }
}
