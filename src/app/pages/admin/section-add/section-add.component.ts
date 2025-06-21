import { SectionResponse } from './../../../core/models/section';
import { SectionService } from './../../../core/services/section.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-section-add',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './section-add.component.html',
  styleUrl: './section-add.component.css'
})
export class SectionAddComponent {
private sectionService: SectionService = inject(SectionService);
  isOpen = false;
  isError = false;
  section: SectionResponse | null = null;

  sectionForm = new FormGroup({
    name: new FormControl('')
  });

  submitsection() {
    const name = this.sectionForm.value.name ?? '';

    this.sectionService.addSection(name)
      .then((data) => {
        this.section = data;
        this.isOpen = true;
        this.sectionForm.reset();
      })
      .catch((err: unknown) => {
        this.isError = true;
        if (err instanceof Error) {
          this.section = { message: err.message, section: { _id: '', name: '', __v: 0 } };
        } else {
          this.section = { message: 'Une erreur inconnue est survenue.', section: { _id: '', name: '', __v: 0 } };
        }
      });
  }

  close() {
    this.isOpen = false;
    this.isError = false;
  }
}
