import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contact = {
    nom: '',
    email: '',
    sujet: '',
    message: '',
  };

  envoyerMessage() {
    console.log('Message envoyé :', this.contact);

    alert('Votre message a été envoyé avec succès ! Merci.');

    this.contact = {
      nom: '',
      email: '',
      sujet: '',
      message: '',
    };
  }
}
