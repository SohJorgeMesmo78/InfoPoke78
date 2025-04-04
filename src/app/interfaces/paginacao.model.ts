export interface Paginacao<T> {
  total: number;
  pagina: number;
  totalPaginas: number;
  limite: number;
  data: T[];
}
