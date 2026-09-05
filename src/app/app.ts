import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemsState } from './core/states/items';
import { ResultsTable } from './features/results-table/results-table';
import { SearchForm } from './features/search-form/search-form';

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
export class App implements OnInit {


    protected showResultsTable = signal(false);
    protected readonly title = signal('elden-ring-build-helper');

    private readonly state = inject(ItemsState);

    ngOnInit() {
        this.state.value$.subscribe(itens => {
            this.showResultsTable.set(itens.length > 0);
        });
    }
}
