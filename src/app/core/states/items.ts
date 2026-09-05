import { Injectable } from "@angular/core";
import { BehaviorSubject, shareReplay } from "rxjs";
import { Item } from "../models/item";

@Injectable({
  providedIn: 'root',
})
export class ItemsState {

    private _value$ = new BehaviorSubject<Item[]>([]);
    private _value: Item[] = [];

    get value() {
        return this._value;
    }

    get value$() {
        return this._value$.asObservable().pipe(shareReplay());
    }

    set value(value: Item[]) {
        this._value = value;
        this._value$.next(value);
    }

    add(item: Item): void {
        console.log("Adding item: ", item);
        this.value = [...this.value, item];
        console.log("Current Value: ", this.value);
    }

    remove(item: Item): void {
        let currentValue = this.value;
        currentValue = currentValue.filter(c => c.id != item.id);
        this.value = currentValue;
    }

    reset(): void {
        this._value = [];
        this._value$.next([]);
    }

}