import React, { useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Grid, MoreVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Table from './table';
import tableIcon from '../assets/icons/Table.svg';
import { RootState } from '../store/store';
import {
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
} from '../store/floorManagementSlice';
import { TableType } from '../types';
import TableDetailsForm from './tableDetailForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Utensils, User, Globe } from 'lucide-react';


const FloorManagement = () => {
    const dispatch = useDispatch();
    const { rooms, selectedRoom, selectedTable } = useSelector((state: RootState) => state.floorManagement);

    useEffect(() => {
        dispatch(loadRooms());
    }, [dispatch]);

    const handleAddTable = () => {
        dispatch(addTable());
    };

    const handleAddRoom = () => {
        dispatch(addRoom());
    };

    const handleDuplicateTable = (tableId: string) => {
        dispatch(duplicateTable(tableId));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;
        dispatch(updateTablePosition({
            tableId: active.id as string,
            deltaX: delta.x,
            deltaY: delta.y
        }));
    };

    const handleSelectTable = (tableId: string) => {
        dispatch(selectTable(tableId));
    };

    const handleSelectRoom = (roomId: string) => {
        dispatch(selectRoom(roomId));
    };

    const handleRotateTable = (tableId: string) => {
        dispatch(rotateTable(tableId));
    };

    const handleDeleteTable = (tableId: string) => {
        dispatch(deleteTable(tableId));
    };

    const handleToggleActive = (tableId: string) => {
        dispatch(toggleTableActive(tableId));
    };

    const handleSaveRoom = () => {
        dispatch(saveRooms());
        toast.success("Room saved successfully!");
    };

    const handleUpdateTable = (updatedTable: Partial<TableType>) => {
        if (!selectedTable) return;

        if ('active' in updatedTable) {
            dispatch(toggleTableActive(selectedTable.id));
            return;
        }

        console.log("Updating table:", selectedTable.id, updatedTable);
        dispatch(updateTable({ tableId: selectedTable.id, updates: updatedTable }));
    };


    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <ToastContainer />
            <div className="flex justify-center items-center p-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold">Floor Management</h1>
            </div>


            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-16 bg-gray-50 border-r border-gray-200">
                    <div className="flex flex-col items-center gap-6 py-4">
                        <button className="p-2 rounded-lg bg-red-50">
                            <Grid className="w-6 h-6 text-red-600" />
                        </button>
                    </div>
                </div>

                {/* Table Management Panel */}
                <div className="w-72 border-r border-gray-200">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold">Tables</h2>
                        </div>

                        {/* Table Options */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-2">Table Options</h3>
                            <p className="text-sm text-gray-500 mb-4">Click to add your tables</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className="border-2 border-dashed border-gray-200 p-4 rounded-lg cursor-pointer hover:border-red-200"
                                    onClick={handleAddTable}
                                >
                                    <div className="w-16 h-16 mx-auto flex items-center justify-center">
                                        <img src={tableIcon} alt="Table" className="w-full h-full" />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Table Details */}
                        {selectedTable && (
                            <TableDetailsForm />
                        )}
                    </div>
                </div>

                {/* Main Area */}
                <div className="flex-1 flex flex-col">
                    {/* Room Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex gap-4">
                            {rooms.map(room => (
                                <button
                                    key={room.id}
                                    onClick={() => handleSelectRoom(room.id)}
                                    className={`text-sm px-4 py-2 ${selectedRoom?.id === room.id ? 'text-red-600 border-b-2 border-red-600' : ''}`}
                                >
                                    {room.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleAddRoom} className="px-4 py-2 bg-red-600 text-white rounded-lg">Add Room</button>
                            <button onClick={handleSaveRoom} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600">Save Room</button>
                            <button className="p-2">
                                <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Floor Plan */}
                    <DndContext onDragEnd={handleDragEnd}>
                        <div className="flex-1 relative bg-white p-4">
                            <div
                                className="w-full h-full"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}
                            >
                                {selectedRoom.tables.map((table) => (
                                    <Table
                                        key={table.id}
                                        table={table}
                                        onSelect={handleSelectTable}
                                        onRotate={handleRotateTable}
                                        onDelete={handleDeleteTable}
                                        onUpdate={handleUpdateTable}
                                        onToggleActive={handleToggleActive}
                                        onDuplicate={handleDuplicateTable}
                                        isSelected={selectedTable?.id === table.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </DndContext>

                    {/* Status Bar */}
                    <div className="bg-gray-900 text-white px-1 py-2 flex items-center justify-center m-5 rounded-lg">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Utensils className="w-4 h-4" />
                                <span>{selectedRoom.tables.length} Tables</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>12 Main Covers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>12 Max Covers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <span>3-12 Online Capacity</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default FloorManagement;