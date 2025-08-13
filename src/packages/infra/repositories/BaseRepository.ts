export abstract class BaseRepository<T> {
  protected abstract tableName: string;

  abstract create(entity: Omit<T, 'id'> & { id: string }): Promise<T>;
  abstract update(id: string, entity: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
}

export { BaseRepository }