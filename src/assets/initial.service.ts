import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

export interface Data {
  id: string;
  title: string;
  description: string;
  selection: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})

export class InitialService {

  constructor() { }

  initiateAtStart(): void {

    const storedValue = localStorage.getItem('todos');

    if (storedValue === null || storedValue === undefined) {

      const initiatePayload: Data = {
        id          : "1",
        title       : "Example 1",
        description : faker.lorem.paragraph(),
        selection   : "Pending",
        created_at  : new Date().toISOString(),
        updated_at  : new Date().toISOString(),
      }

      const initiatePayload2: Data = {
        id          : "001",
        title       : "First",
        description : "Description",
        selection   : "Pending",
        created_at  : new Date().toISOString(),
        updated_at  : new Date().toISOString(),
      }
  
      const newArr = [initiatePayload,initiatePayload2];
      const outerValue = { Pending: newArr};
      const outerValueString = JSON.stringify(outerValue);
      localStorage.setItem('todos', JSON.stringify(outerValue));

      const initiatePayloadProgress: Data = {
        id          : "2",
        title       : "Example 2",
        description : faker.lorem.paragraph(),
        selection   : "InProgress",
        created_at  : new Date().toISOString(),
        updated_at  : new Date().toISOString(),
      }

      const initiatePayloadProgress2: Data = {
        id          : "002",
        title       : "Second",
        description : "Description",
        selection   : "InProgress",
        created_at  : new Date().toISOString(),
        updated_at  : new Date().toISOString(),
      }
  
      const newArr1 = [initiatePayloadProgress,initiatePayloadProgress2];
      const outerValue1 = { ...JSON.parse(outerValueString), ...{ InProgress: newArr1 } };
      const outerValueString1 = JSON.stringify(outerValue1);
      localStorage.setItem('todos', JSON.stringify(outerValue1));

      const initiatePayloadFinished: Data = {
        id          : "3",
        title       : "Example 3",
        description : faker.lorem.paragraph(),
        selection   : "Finished",
        created_at  : new Date().toISOString(),
        updated_at  : new Date().toISOString(),
      }

      const initiatePayloadFinished2: Data = {
        id          : "003",
        title       : "Third",
        description : "Description",
        selection   : "Finished",
        created_at  : new Date().toISOString(),
        updated_at  : new Date().toISOString(),
      }
  
      const newArr2 = [initiatePayloadFinished,initiatePayloadFinished2];
      const outerValue2 = { ...JSON.parse(outerValueString), ...{ Finished: newArr2 }, ...JSON.parse(outerValueString1) };
      localStorage.setItem('todos', JSON.stringify(outerValue2));

    }
    
  }
}
