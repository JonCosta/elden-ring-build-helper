import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Item } from '../../core/models/item';
import { ItemsState } from '../../core/states/items';

@Component({
    selector: 'app-results-table',
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './results-table.html',
    styleUrl: './results-table.scss',
})
export class ResultsTable {

    @Input() items!: Item[];

    protected displayedColumns = ['name', 'str', 'dex', 'int', 'fai', 'arc', 'actions']

    private readonly state = inject(ItemsState);

    get highestStr(): number {
        return this.getMaxByAttribute('str');
    }

    get highestDex(): number {
        return this.getMaxByAttribute('dex');
    }

    get highestInt(): number {
        return this.getMaxByAttribute('int');
    }

    get highestFai(): number {
        return this.getMaxByAttribute('fai');
    }

    get highestArc(): number {
        return this.getMaxByAttribute('arc');
    }

    public removeItem(item: Item) {
        this.state.remove(item);
    }

    private getMaxByAttribute(attribute: 'str' | 'dex' | 'int' | 'fai' | 'arc') {
        let max = 0;
        this.items.forEach(item => {
            if (item.requirements[attribute] > max)
                max = item.requirements[attribute];
        });
        return max;
    }
}
