import { Table } from "./Table";

export interface Floor {
    id: string;
    name: string;
    tables: Table[];
}