import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PromotionService } from './../../../core/services/promotion.service';
import { FaculteAll } from './../../../core/models/faculte';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-faculte',
  imports: [RouterLink, NgFor],
  templateUrl: './list-faculte.component.html',
  styleUrl: './list-faculte.component.css'
})
export class ListFaculteComponent {
  promotionService: PromotionService = inject(PromotionService)
  facultes !:FaculteAll[]

  ngOnInit():void {
    this.promotionService.faculteAll().then((data:FaculteAll[]) => {
      this.promotionService.faculteArray = data
      this.facultes = this.promotionService.faculteArray
    })
  }
    onDelete(id: string){
      this.promotionService.deleteFaculte(id).then(() => {
        this.promotionService.faculteArray = this.promotionService.faculteArray.filter(faculte => faculte._id !== id);
        this.facultes = [...this.promotionService.faculteArray];
      }).catch(error => {
        console.error('Erreur lors de la suppression de la faculté :', error);
      });
    }
  
}
