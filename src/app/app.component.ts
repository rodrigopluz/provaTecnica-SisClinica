import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User, Country } from './_models';
import { UserService, CountryService, AuthenticationService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    users: User[] = [];
    country: Country[] = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private countryService: CountryService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllCountry();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    private loadAllCountry() {
        this.countryService.getAll().pipe(first()).subscribe(country => {
            this.country = country;
        });
    }
}