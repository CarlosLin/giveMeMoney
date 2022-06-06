interface HeaderColumn {
  checkedColumns: ColumnType[];
  totalColumns: ColumnType[];
}
interface ColumnType {
  prop: string;
  label: string;
  width?: number;
  fixed?: string;
  sortable?: boolean;
}

export { type HeaderColumn, type ColumnType };
