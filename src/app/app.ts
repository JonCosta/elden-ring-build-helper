import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Item } from './core/models/item';
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

    protected items: Item[] = [];
    protected showResultsTable = signal(false);
    protected readonly title = signal('elden-ring-build-helper');

    private readonly state = inject(ItemsState);

    ngOnInit(): void {
        this.state.value$.subscribe(stateItems => {
            this.items = stateItems;
            this.showResultsTable.set(stateItems.length > 0);
        });
    }
}
