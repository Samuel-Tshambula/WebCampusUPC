import { NgIf } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from './../../../core/services/section.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-section-update',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './section-update.component.html',
  styleUrl: './section-update.component.css'
})
export class SectionUpdateComponent {
  sectionService: SectionService = inject(SectionService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  sectionForm = new FormGroup({
    name: new FormControl('')
  });

  isOpen = false;
  isError = false;
  message: string | null = null;
  sectionId!: string;

  async ngOnInit() {
    this.sectionId = this.route.snapshot.paramMap.get('id') ?? '';

    try {
      const section = await this.sectionService.getSectionById(this.sectionId);
      this.sectionForm.patchValue({ name: section.name });
    } catch (err: any) {
      this.message = err.message || 'Erreur lors du chargement';
      this.isError = true;
    }
  }

  async submitUpdateSection() {
    try {
      const name = this.sectionForm.value.name ?? '';
      const res = await this.sectionService.updateSection(this.sectionId, name);
      this.message = res.message;
      this.isOpen = true;
    } catch (err: any) {
      this.message = err.message || 'Erreur lors de la mise à jour';
      this.isError = true;
    }
  }

  close() {
    this.isOpen = false;
    this.isError = false;
  }
}
