import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Item } from '../../core/models/item';
import { ItemsState } from '../../core/states/items';

@Component({
    selector: 'app-results-table',
    imports: [
        CommonModule,
        MatTableModule
    ],
    templateUrl: './results-table.html',
    styleUrl: './results-table.scss',
})
export class ResultsTable implements OnInit {

    @Input() items!: Item[];

    protected displayedColumns = ['name', 'str', 'dex', 'int', 'fai', 'arc']

    private readonly state = inject(ItemsState);

    ngOnInit(): void {

    }

    removeItem(item: Item) {
        this.state.remove(item);
    }
}
