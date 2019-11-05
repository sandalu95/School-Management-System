import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Clerk } from '../models/clerk';

@Injectable({
  providedIn: 'root'
})
export class ClerkService {

  private clerkSource = new BehaviorSubject<Clerk>(null);
  currentClerk = this.clerkSource.asObservable();

  constructor() { }

  changeClerk(clerk:Clerk) {
    this.clerkSource.next(clerk);
  }
}
