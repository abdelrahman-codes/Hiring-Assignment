/**
 * @file IApartmentDto.ts
 * @description Data Transfer Object (DTO) interface for Apartment creation.
 * This defines the expected structure of the apartment data received from the client.
 */

// Interface defining the structure of data for creating an apartment.

export interface IApartmentDto {
  name: string;
  unit_number: string;
  project_name: string;
  description: string;
  price: number;
  location: string;
  map_location?: string;
  images?: string[]; // Optional, default to empty array
}
