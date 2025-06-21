import { NgIf } from '@angular/common';
import { Faculte } from './../../../core/models/faculte';
import { PromotionService } from './../../../core/services/promotion.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-faculte-add',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './faculte-add.component.html',
  styleUrl: './faculte-add.component.css'
})
export class FaculteAddComponent {
  promotionService : PromotionService = inject(PromotionService)
  faculte : Faculte | null = null
  isOpen: boolean = false
  isError: boolean = false;

  faculteForm = new FormGroup({
    name : new FormControl('')
  })

   submitfaculte(){
    const name = this.faculteForm.value.name ?? '';
    this.promotionService.addFaculte(name)
    .then((data: Faculte) => {
      this.faculte = data
      this.isOpen = true
      this.promotionService.faculteArray.unshift(data.faculty)
      this.faculteForm.reset();
    }).catch((err) => {
      this.faculte = err
      this.isError = true;
      });
  }


  close(){
    this.isOpen= false
    this.isError = false;
  }
}
