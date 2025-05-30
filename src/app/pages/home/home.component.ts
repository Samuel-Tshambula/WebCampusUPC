import { Component, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target')!;
      const count = +counter.innerHTML;
      const increment = target / 100;

      if (count < target) {
        counter.innerHTML = `${Math.ceil(count + increment)}`;
        setTimeout(updateCount, 20);
      } else {
        counter.innerHTML = target.toString();
      }
    };
    updateCount();
  });
}

}
