import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Table as TableType } from '../types/Table';
import tableIcon from '../assets/icons/Table.svg';
import { Trash, RotateCw, Copy } from 'lucide-react';

interface TableProps {
  table: TableType;
  onSelect: (tableId: string) => void;
  onRotate: (tableId: string) => void;
  onDelete: (tableId: string) => void;
  onToggleActive: (tableId: string) => void;
  onUpdate: (updatedTable: Partial<TableType>) => void;
  onDuplicate: (tableId: string) => void;
  isSelected: boolean;
}

const Table: React.FC<TableProps> = ({
  table,
  onSelect,
  onRotate,
  onDelete,
  onDuplicate,
  onUpdate,
  isSelected
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: table.id,
    disabled: isSelected
  });

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Table double clicked:', table.id);
    onSelect(table.id);
  };

  const style = {
    transform: `translate3d(${table.x + (transform?.x || 0)}px, ${table.y + (transform?.y || 0)
      }px, 0) rotate(${table.rotation}deg)`,
    position: 'absolute' as 'absolute',
    cursor: isSelected ? 'default' : 'grab',
    zIndex: isSelected ? 2 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isSelected ? {} : listeners)}
      {...(isSelected ? {} : attributes)}
      onDoubleClick={handleDoubleClick}
      className="table-component"
    >
      <div className={`relative ${table.active ? 'opacity-100' : 'opacity-50'}`}>
        <img src={tableIcon} alt={`Table ${table.id}`} style={{ width: '100px', height: '100px' }} />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: '#FFDFDD',
            fontFamily: 'fantasy',
            color: '#F98B88',
          }}
        >
          {table.name}
        </span>
      </div>

      {isSelected && (
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            zIndex: 3
          }}
          onClick={e => e.stopPropagation()}
        >
          <RotateCw
            onClick={e => {
              e.stopPropagation();
              onRotate(table.id);
            }}
            style={{
              width: '15px',
              height: '15px',
              marginRight: '10px',
            }}
            className="cursor-pointer"
          />
          <Copy
            onClick={e => {
              e.stopPropagation();
              onDuplicate(table.id);
            }}
            style={{
              width: '15px',
              height: '15px',
              marginRight: '10px',
            }}
            className="cursor-pointer"
          />
          <Trash
            onClick={e => {
              e.stopPropagation();
              onDelete(table.id);
            }}
            style={{
              width: '15px',
              height: '15px'
            }}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Table;