import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableType, Room } from '../types';

interface FloorManagementState {
    rooms: Room[];
    selectedRoom: Room;
    selectedTable: TableType | null;
    tableCount: number;
}

const initialState: FloorManagementState = {
    rooms: [
        {
            id: '1',
            name: 'Main Room',
            tables: [],
        },
    ],
    selectedRoom: {
        id: '1',
        name: 'Main Room',
        tables: [],
    },
    selectedTable: null,
    tableCount: 0,
};

const floorManagementSlice = createSlice({
    name: 'floorManagement',
    initialState,
    reducers: {
        addTable: (state) => {
            const newTable: TableType = {
                id: `T-${(state.tableCount + 1).toString().padStart(2, '0')}`,
                x: 100,
                y: 100,
                name: `T-${(state.tableCount + 1).toString().padStart(2, '0')}`,
                minCovers: 1,
                maxCovers: 4,
                active: true,
                width: 100,
                height: 100,
                rotation: 0,
            };

            state.selectedRoom.tables.push(newTable);
            state.tableCount += 1;

            // room array - room update
            const roomIndex = state.rooms.findIndex((r: { id: any; }) => r.id === state.selectedRoom.id);
            if (roomIndex !== -1) {
                state.rooms[roomIndex] = state.selectedRoom;
            }
        },

        addRoom: (state) => {
            const newRoom: Room = {
                id: (state.rooms.length + 1).toString(),
                name: `Room ${state.rooms.length + 1}`,
                tables: [],
            };
            state.rooms.push(newRoom);
            state.selectedRoom = newRoom;
        },

        updateTablePosition: (state, action: PayloadAction<{ tableId: string; deltaX: number; deltaY: number }>) => {
            const { tableId, deltaX, deltaY } = action.payload;
            const table = state.selectedRoom.tables.find((t: { id: string; }) => t.id === tableId);
            if (table) {
                table.x += deltaX;
                table.y += deltaY;

                // room array - room update
                const roomIndex = state.rooms.findIndex((r: { id: any; }) => r.id === state.selectedRoom.id);
                if (roomIndex !== -1) {
                    state.rooms[roomIndex] = state.selectedRoom;
                }
            }
        },

        selectTable: (state, action: PayloadAction<string>) => {
            const tableId = action.payload;
            const table = state.selectedRoom.tables.find((t: { id: string; }) => t.id === tableId);
            state.selectedTable = state.selectedTable?.id === tableId ? null : table ?? null;
        },

        selectRoom: (state, action: PayloadAction<string>) => {
            const roomId = action.payload;
            const room = state.rooms.find((r: { id: string; }) => r.id === roomId);
            if (room) {
                state.selectedRoom = room;
                state.selectedTable = null;
            }
        },

        rotateTable: (state, action: PayloadAction<string>) => {
            const tableId = action.payload;
            const table = state.selectedRoom.tables.find((t: { id: string; }) => t.id === tableId);
            if (table) {
                table.rotation = (table.rotation + 90) % 360;

                // room array - room update
                const roomIndex = state.rooms.findIndex((r: { id: any; }) => r.id === state.selectedRoom.id);
                if (roomIndex !== -1) {
                    state.rooms[roomIndex] = state.selectedRoom;
                }
            }
        },

        deleteTable: (state, action: PayloadAction<string>) => {
            const tableId = action.payload;
            state.selectedRoom.tables = state.selectedRoom.tables.filter((table: { id: string; }) => table.id !== tableId);
            state.selectedTable = null;

            // room array - room update
            const roomIndex = state.rooms.findIndex((r: { id: any; }) => r.id === state.selectedRoom.id);
            if (roomIndex !== -1) {
                state.rooms[roomIndex] = state.selectedRoom;
            }
        },

        toggleTableActive: (state, action: PayloadAction<string>) => {
            const tableId = action.payload;
            const table = state.selectedRoom.tables.find((t: { id: string; }) => t.id === tableId);
            if (table) {
                table.active = !table.active;

                // room array - room update
                const roomIndex = state.rooms.findIndex((r: { id: any; }) => r.id === state.selectedRoom.id);
                if (roomIndex !== -1) {
                    state.rooms[roomIndex] = state.selectedRoom;
                }
            }
        },

        updateTable: (state, action: PayloadAction<{ tableId: string; updates: Partial<TableType> }>) => {
            const { tableId, updates } = action.payload;
            const table = state.selectedRoom.tables.find((t: { id: string; }) => t.id === tableId);
            if (table) {
                Object.assign(table, updates);

                // room array - room update
                const roomIndex = state.rooms.findIndex((r: { id: any; }) => r.id === state.selectedRoom.id);
                if (roomIndex !== -1) {
                    state.rooms[roomIndex] = state.selectedRoom;
                }
            }
        },

        duplicateTable: (state, action: PayloadAction<string>) => {
            const tableId = action.payload;
            const table = state.selectedRoom.tables.find((t: { id: string; }) => t.id === tableId);

            if (table) {
                const newTableNumber = state.tableCount + 1;
                const newTable: TableType = {
                    ...table,
                    id: `T-${newTableNumber.toString().padStart(2, '0')}`,
                    name: `T-${newTableNumber.toString().padStart(2, '0')}`,
                    x: table.x + 40,
                    y: table.y + 40,
                };

                state.selectedRoom.tables.push(newTable);
                state.tableCount += 1;
                state.selectedTable = newTable;

                // room array - room update
                const roomIndex = state.rooms.findIndex((r: { id: any; }) => r.id === state.selectedRoom.id);
                if (roomIndex !== -1) {
                    state.rooms[roomIndex] = state.selectedRoom;
                }
            }
        },

        saveRooms: (state) => {
            localStorage.setItem('rooms', JSON.stringify(state.rooms));
        },

        loadRooms: (state) => {
            const savedRooms = localStorage.getItem('rooms');
            if (savedRooms) {
                state.rooms = JSON.parse(savedRooms);
                state.selectedRoom = state.rooms[0];
                state.selectedTable = null;
                state.tableCount = Math.max(...state.rooms.flatMap((room: { tables: { id: string; }[]; }) =>
                    room.tables.map((table: { id: string; }) => parseInt(table.id.split('-')[1]))
                ), 0);
            }
        },
    },
});

export const {
    addTable,
    addRoom,
    updateTablePosition,
    selectTable,
    selectRoom,
    rotateTable,
    deleteTable,
    toggleTableActive,
    updateTable,
    saveRooms,
    loadRooms,
    duplicateTable,
} = floorManagementSlice.actions;

export default floorManagementSlice.reducer;