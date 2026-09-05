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

    add(item: Item) {
        console.log("Adding item: ", item);
        let currentValue = this.value;
        currentValue.push(item);
        this.value = currentValue;
        console.log("Current Value: ", this.value);
    }

    remove(item: Item) {
        let currentValue = this.value;
        currentValue = currentValue.filter(c => c.id != item.id);
        this.value = currentValue;
    }

    reset() {
        this._value = [];
        this._value$.next([]);
    }

}