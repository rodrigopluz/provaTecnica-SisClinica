import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from '@/_models';

@Injectable({ providedIn: 'root' })
export class CountryService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Country[]>(`${config.apiUrl}/country`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/country/${id}`);
    }

    update(country: Country) {
        return this.http.put(`${config.apiUrl}/country/${country.id}`, country);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/country/${id}`);
    }
}