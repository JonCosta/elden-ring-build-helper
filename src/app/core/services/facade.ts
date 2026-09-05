import { inject, Injectable } from "@angular/core";
import { EldenRingService } from "./service";
import { SearchRequest } from "../models/search";
import { map, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EldenRingFacade {
    private readonly api = inject(EldenRingService);

    public getItems(request: SearchRequest) {
        return this.api.searchItemsByCategory(request).pipe(
            this.mapResponse(),
            take(1)
        )
    }

    protected mapResponse() {
        return map((apiResponse: any) => apiResponse?.data)
    }
}