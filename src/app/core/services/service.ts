import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../models/response';
import { SearchRequest } from '../models/search';

@Injectable({
  providedIn: 'root',
})
export class EldenRingService {

  private readonly http = inject(HttpClient);
  private readonly eldenRingApiUrl = "https://eldenring.fanapis.com/api";

  public searchItemsByCategory(request: SearchRequest) {
    return this.http.get<ApiResponse>(`${this.eldenRingApiUrl}/${request.category}?name=${request.name}`);
  }

}
