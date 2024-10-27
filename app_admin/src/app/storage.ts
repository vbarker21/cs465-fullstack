import { InjectionToken } from '@angular/core';

// Define a token for accessing localStorage
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

export class Storage {
    
  }
