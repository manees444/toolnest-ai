// This application is stateless and doesn't require data persistence
// Keeping the interface for consistency with the existing structure

export interface IStorage {
  // No storage operations needed for this stateless application
}

export class MemStorage implements IStorage {
  constructor() {
    // No storage needed
  }
}

export const storage = new MemStorage();
