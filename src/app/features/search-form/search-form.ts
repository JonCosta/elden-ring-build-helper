import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Item } from '../../core/models/item';
import { EldenRingFacade } from '../../core/services/facade';
import { ItemsState } from '../../core/states/items';

@Component({
  selector: 'app-search-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss'
})
export class SearchForm implements OnInit {

  protected form!: FormGroup;
  protected searchedItems$!: Observable<Item[]>;

  private destroy$ = new Subject<void>();
  private facade = inject(EldenRingFacade);
  private readonly state = inject(ItemsState);

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.initForm();

    this.searchedItems$ = this.form.controls['name'].valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap(value => {
        const searchStr = typeof value === 'string' ? value : '';
        
        if (searchStr.trim() === '')
          return of([])

        const request = this.form.getRawValue();
        return this.facade.getItems(request);
      })
    )
  }

  public handleSelectedOption(event: MatAutocompleteSelectedEvent) {
    const item = event.option.value;
    this.state.add(item);
    this.form.get('name')?.reset();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [],
      category: ['weapons']
    })
  }

}
