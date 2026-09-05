import { inject, Injectable } from "@angular/core";
import { map, take } from "rxjs";
import { Item, ItemRequirements } from "../models/item";
import { ApiResponse, ResponseData } from "../models/response";
import { SearchRequest } from "../models/search";
import { EldenRingService } from "./service";

@Injectable({ providedIn: 'root' })
export class EldenRingFacade {
    private readonly api = inject(EldenRingService);

    public getItems(request: SearchRequest) {
        return this.api.searchItemsByCategory(request).pipe(
            this.mapResponse(),
            take(1)
        )
    }

    private mapResponse() {
        return map((apiResponse: ApiResponse) => {
            const data = apiResponse?.data;
            const items: Item[] = data.map(d => {
                return {
                    id: d.id,
                    image: d.image,
                    name: d.name,
                    requirements: this.mapRequirements(d)
                };
            })
            return items;
        })
    }

    private mapRequirements(responseData: ResponseData): ItemRequirements {
        const attributes = responseData.requiredAttributes ?? responseData.requires;
        const str = attributes?.find(a => a.name === 'Str');
        const dex = attributes?.find(a => a.name === 'Dex');
        const int = attributes?.find(a => a.name === 'Int');
        const fai = attributes?.find(a => a.name === 'Fai');
        const arc = attributes?.find(a => a.name === 'Arc');
        return {
            str: str ? str.amount : 0,
            dex: dex ? dex.amount : 0,
            int: int ? int.amount : 0,
            fai: fai ? fai.amount : 0,
            arc: arc ? arc.amount : 0
        };
    }
}