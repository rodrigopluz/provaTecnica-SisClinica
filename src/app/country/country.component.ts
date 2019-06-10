import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Country } from '@/_models';
import { CountryService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'country.component.html' })
export class CountryComponent implements OnInit, OnDestroy {
    currentCountry: Country;
    currentUserSubscription: Subscription;
    countrys: Country[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private countryService: CountryService
    ) {
        this.currentUserSubscription = this.authenticationService.currentCountry.subscribe(country => {
            this.currentCountry = country;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.countryService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.countryService.getAll().pipe(first()).subscribe(country => {
            this.countrys = country;
        });
    }
}