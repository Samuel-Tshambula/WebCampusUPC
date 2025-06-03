import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualites',
  imports: [RouterLink, NgFor, CommonModule], // commonModule permet d'utiliser les directives Angular de base comme ngFor et ngIf ou encore les pipes slice, date, uppercase, lowercase, etc.
  templateUrl: './actualites.component.html',
  styleUrl: './actualites.component.css'
})
export class ActualitesComponent {
   actualites = [
    {
      id: 1,
      titre: 'Ouverture de la Semaine Scientifique',
      description: 'La semaine scientifique de l’UPC débute ce lundi avec plusieurs conférences prévues...',
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH8tAHvh7heyeDLyRkFlHrFs1u1AUzzWaf43Vx2viuXPA2Whk6P5HpPcvcSP89jaGUskw2KlSpjldIv204QWAnB8-Mj0arDC-Jo8RYAqIiY2sRR2NEQOFjBOmvHBw97Amb-QTpugNFQaqyKX6kopkhnOc4ji12XnOaI921x-xz34JYH1qilXj4YJDqqUOm/w1200-h630-p-k-no-nu/Childern's%20Book%20Day%20Blog%20Banner(2).png",
      date: new Date('2025-06-01')
    },
    {
      id: 2,
      titre: 'Lancement du nouveau portail étudiant',
      description: 'Le portail numérique des étudiants a été refondu pour offrir une meilleure expérience...',
      image: "https://th.bing.com/th/id/OIP.ke0nCEVKTf1EZ9mKBbsP8QHaFJ?w=909&h=632&rs=1&pid=ImgDetMain",
      date: new Date('2025-05-28')
    },
    {
      id: 3,
      titre: 'UPC parmi les meilleures universités du pays',
      description: 'L’UPC a été classée parmi les meilleures institutions universitaires du pays selon le dernier rapport...',
      image: "https://th.bing.com/th/id/OIP.ke0nCEVKTf1EZ9mKBbsP8QHaFJ?w=909&h=632&rs=1&pid=ImgDetMain",
      date: new Date('2025-05-20')
    },
    {
      id: 1,
      titre: 'Ouverture de la Semaine Scientifique',
      description: 'La semaine scientifique de l’UPC débute ce lundi avec plusieurs conférences prévues...',
      image: "https://th.bing.com/th/id/OIP.ke0nCEVKTf1EZ9mKBbsP8QHaFJ?w=909&h=632&rs=1&pid=ImgDetMain",
      date: new Date('2025-06-01')
    },
    {
      id: 2,
      titre: 'Lancement du nouveau portail étudiant',
      description: 'Le portail numérique des étudiants a été refondu pour offrir une meilleure expérience...',
      image: "https://www.archipel-evenement.com/wp-content/uploads/2023/07/Portes-ouvertes-1_0.jpeg",
      date: new Date('2025-05-28')
    },
    {
      id: 3,
      titre: 'UPC parmi les meilleures universités du pays',
      description: 'L’UPC a été classée parmi les meilleures institutions universitaires du pays selon le dernier rapport...',
      image: "https://www.archipel-evenement.com/wp-content/uploads/2023/07/Portes-ouvertes-1_0.jpeg",
      date: new Date('2025-05-20')
    },
    {
      id: 3,
      titre: 'UPC parmi les meilleures universités du pays',
      description: 'L’UPC a été classée parmi les meilleures institutions universitaires du pays selon le dernier rapport...',
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH8tAHvh7heyeDLyRkFlHrFs1u1AUzzWaf43Vx2viuXPA2Whk6P5HpPcvcSP89jaGUskw2KlSpjldIv204QWAnB8-Mj0arDC-Jo8RYAqIiY2sRR2NEQOFjBOmvHBw97Amb-QTpugNFQaqyKX6kopkhnOc4ji12XnOaI921x-xz34JYH1qilXj4YJDqqUOm/w1200-h630-p-k-no-nu/Childern's%20Book%20Day%20Blog%20Banner(2).png",
      date: new Date('2025-05-20')
    },
    {
      id: 1,
      titre: 'Ouverture de la Semaine Scientifique',
      description: 'La semaine scientifique de l’UPC débute ce lundi avec plusieurs conférences prévues...',
      image: "https://www.archipel-evenement.com/wp-content/uploads/2023/07/Portes-ouvertes-1_0.jpeg",
      date: new Date('2025-06-01')
    },,
    {
      id: 3,
      titre: 'UPC parmi les meilleures universités du pays',
      description: 'L’UPC a été classée parmi les meilleures institutions universitaires du pays selon le dernier rapport...',
      image: "https://www.archipel-evenement.com/wp-content/uploads/2023/07/Portes-ouvertes-1_0.jpeg",
      date: new Date('2025-05-20')
    },
    {
      id: 1,
      titre: 'Ouverture de la Semaine Scientifique',
      description: 'La semaine scientifique de l’UPC débute ce lundi avec plusieurs conférences prévues...',
      image: "https://th.bing.com/th/id/R.397e20e163aa094fbb368bed296f8ef3?rik=pQlHvkbc%2bBIptQ&pid=ImgRaw&r=0",
      date: new Date('2025-06-01')
    },,
    {
      id: 3,
      titre: 'UPC parmi les meilleures universités du pays',
      description: 'L’UPC a été classée parmi les meilleures institutions universitaires du pays selon le dernier rapport...',
      image: "https://www.archipel-evenement.com/wp-content/uploads/2023/07/Portes-ouvertes-1_0.jpeg",
      date: new Date('2025-05-20')
    },
    {
      id: 1,
      titre: 'Ouverture de la Semaine Scientifique',
      description: 'La semaine scientifique de l’UPC débute ce lundi avec plusieurs conférences prévues...',
      image: "https://th.bing.com/th/id/R.397e20e163aa094fbb368bed296f8ef3?rik=pQlHvkbc%2bBIptQ&pid=ImgRaw&r=0",
      date: new Date('2025-06-01')
    },,
    {
      id: 3,
      titre: 'UPC parmi les meilleures universités du pays',
      description: 'L’UPC a été classée parmi les meilleures institutions universitaires du pays selon le dernier rapport...',
      image: "https://th.bing.com/th/id/R.397e20e163aa094fbb368bed296f8ef3?rik=pQlHvkbc%2bBIptQ&pid=ImgRaw&r=0",
      date: new Date('2025-05-20')
    },
    {
      id: 1,
      titre: 'Ouverture de la Semaine Scientifique',
      description: 'La semaine scientifique de l’UPC débute ce lundi avec plusieurs conférences prévues...',
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH8tAHvh7heyeDLyRkFlHrFs1u1AUzzWaf43Vx2viuXPA2Whk6P5HpPcvcSP89jaGUskw2KlSpjldIv204QWAnB8-Mj0arDC-Jo8RYAqIiY2sRR2NEQOFjBOmvHBw97Amb-QTpugNFQaqyKX6kopkhnOc4ji12XnOaI921x-xz34JYH1qilXj4YJDqqUOm/w1200-h630-p-k-no-nu/Childern's%20Book%20Day%20Blog%20Banner(2).png",
      date: new Date('2025-06-01')
    },,
    {
      id: 3,
      titre: 'UPC parmi les meilleures universités du pays',
      description: 'L’UPC a été classée parmi les meilleures institutions universitaires du pays selon le dernier rapport...',
      image: "https://th.bing.com/th/id/R.397e20e163aa094fbb368bed296f8ef3?rik=pQlHvkbc%2bBIptQ&pid=ImgRaw&r=0",
      date: new Date('2025-05-20')
    },
    {
      id: 1,
      titre: 'Ouverture de la Semaine Scientifique',
      description: 'La semaine scientifique de l’UPC débute ce lundi avec plusieurs conférences prévues...',
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH8tAHvh7heyeDLyRkFlHrFs1u1AUzzWaf43Vx2viuXPA2Whk6P5HpPcvcSP89jaGUskw2KlSpjldIv204QWAnB8-Mj0arDC-Jo8RYAqIiY2sRR2NEQOFjBOmvHBw97Amb-QTpugNFQaqyKX6kopkhnOc4ji12XnOaI921x-xz34JYH1qilXj4YJDqqUOm/w1200-h630-p-k-no-nu/Childern's%20Book%20Day%20Blog%20Banner(2).png",
      date: new Date('2025-06-01')
    },,
    {
      id: 3,
      titre: 'UPC parmi les meilleures universités du pays',
      description: 'L’UPC a été classée parmi les meilleures institutions universitaires du pays selon le dernier rapport...',
      image: "https://th.bing.com/th/id/R.397e20e163aa094fbb368bed296f8ef3?rik=pQlHvkbc%2bBIptQ&pid=ImgRaw&r=0",
      date: new Date('2025-05-20')
    },
    {
      id: 1,
      titre: 'Ouverture de la Semaine Scientifique',
      description: 'La semaine scientifique de l’UPC débute ce lundi avec plusieurs conférences prévues...',
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH8tAHvh7heyeDLyRkFlHrFs1u1AUzzWaf43Vx2viuXPA2Whk6P5HpPcvcSP89jaGUskw2KlSpjldIv204QWAnB8-Mj0arDC-Jo8RYAqIiY2sRR2NEQOFjBOmvHBw97Amb-QTpugNFQaqyKX6kopkhnOc4ji12XnOaI921x-xz34JYH1qilXj4YJDqqUOm/w1200-h630-p-k-no-nu/Childern's%20Book%20Day%20Blog%20Banner(2).png",
      date: new Date('2025-06-01')
    },
  ];

   // Pagination
  page = 1;
  pageSize = 6;

  get totalPages(): number {
    return Math.ceil(this.actualites.length / this.pageSize);
  }

  get paginatedActualites() {
    const start = (this.page - 1) * this.pageSize;
    return this.actualites.slice(start, start + this.pageSize);
  }

  changePage(delta: number) {
    const newPage = this.page + delta;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }
}
