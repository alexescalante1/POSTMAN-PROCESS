export class Dictionary<T> {
  private data: { [key: string]: T } = {};

  // Insertar o actualizar un elemento
  insertOrUpdate(key: string, value: T): void {
    this.data[key] = value;
  }

  // Obtener un elemento
  get(key: string): T | undefined {
    return this.data[key];
  }

  // Eliminar un elemento
  remove(key: string): void {
    delete this.data[key];
  }

  // Obtener todos los elementos
  getAll(): { [key: string]: T } {
    return this.data;
  }
}
