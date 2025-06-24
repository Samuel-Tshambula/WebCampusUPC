import { CommonModule } from '@angular/common';
import { TpService } from './../../../core/services/tp.service';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-tp-detail',
  imports: [CommonModule],
  templateUrl: './tp-detail.component.html',
  styleUrl: './tp-detail.component.css'
})
export class TpDetailComponent {
  private tpService: TpService = inject(TpService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  tp: any = null;
  isLoading = true;
  error: string | null = null;

  async ngOnInit() {
    const tpId = this.route.snapshot.paramMap.get('id');

    if (!tpId) {
      this.error = 'ID de TP non fourni.';
      this.isLoading = false;
      return;
    }

    try {
      this.tp = await this.tpService.getTPById(tpId);
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.isLoading = false;
    }
  }

  getFileUrl(path: string): string {
    return `http://localhost:5000${path}`;
  }
}
