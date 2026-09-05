import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchForm } from './features/search-form/search-form';
import { ResultsTable } from './features/results-table/results-table';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    SearchForm,
    ResultsTable
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('elden-ring-build-helper');
  
  protected showResultsTable = signal(false);
}
