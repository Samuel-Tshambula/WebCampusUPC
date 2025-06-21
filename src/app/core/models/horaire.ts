export interface Horaire {
  _id?: string;
  jour: string;
  heure_debut: string; // format: "HH:mm"
  heure_fin: string;   // format: "HH:mm"
  salle: string;
  cours: string;       // ID du cours
}

export interface HoraireItem {
  _id: string;
  jour: string;
  heure_debut: string;
  heure_fin: string;
  salle: string;
  cours: {
    _id: string;
    title: string;
    promotion: {
      _id: string;
      nom: string;
      section: {
        _id: string;
        name: string;
      };
      faculty: {
        _id: string;
        nom: string;
      };
    };
  };
}
