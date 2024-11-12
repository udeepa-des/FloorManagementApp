export interface TableType {
    id: string;
    x: number;
    y: number;
    name: string;
    minCovers: number;
    maxCovers: number;
    active: boolean;
    width: number;
    height: number;
    rotation: number;
}

export interface Room {
    id: string;
    name: string;
    tables: TableType[];
}