import { Faculte } from './../../../core/models/faculte';
import { PromotionService } from './../../../core/services/promotion.service';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faculte-update',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './faculte-update.component.html',
  styleUrl: './faculte-update.component.css'
})
export class FaculteUpdateComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  promotionService : PromotionService = inject(PromotionService)
  faculte !: any | undefined
  articleId: string | null = this.route.snapshot.paramMap.get('id');
  isOpen: boolean = false
  isError: boolean = false;

  faculteForm = new FormGroup({
    name : new FormControl('')
  })

  ngOnInit(): void {
    if (this.articleId) {
      
      this.promotionService.getFaculteById(this.articleId).then((data: any | undefined) => {
        this.faculte = data;
        
        this.faculteForm = new FormGroup({
          name: new FormControl(this.faculte?.nom??"")
        })

      }).catch((err) => {
        console.error('Erreur lors de la récupération de la faculté :', err);
      });
    }
  }

  edit(){
    this.promotionService.updateFaculte(this.articleId??'', this.faculteForm.value.name ?? '')
    .then((data: Faculte) => {
      this.faculte = data
      this.isOpen = true
      this.promotionService.faculteArray = this.promotionService.faculteArray.map((faculte) => {
        if (faculte._id === data.faculty._id) {
          return data.faculty;
        }
        return faculte;
      });
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
