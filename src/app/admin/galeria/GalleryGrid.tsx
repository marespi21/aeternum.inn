"use client";

import React, { useState, useEffect } from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Image as ImageIcon, Video, GripHorizontal } from "lucide-react";
import { updateGalleryOrder, deleteGalleryItem } from "./actions";

interface GalleryItem {
  id: string;
  url: string;
  type: string;
  sort_order: number;
}

function SortableItem({ item, onDelete }: { item: GalleryItem, onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
    touchAction: 'none', // Prevents mobile scrolling issues
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative group rounded-xl overflow-hidden bg-black border cursor-grab active:cursor-grabbing touch-none select-none ${isDragging ? 'border-emerald-500 shadow-xl shadow-emerald-500/20' : 'border-white/5'} aspect-square`}
      {...attributes} 
      {...listeners}
      onDragStart={(e) => e.preventDefault()} // Prevents native browser image dragging
    >
      {item.type === 'video' ? (
        <video src={item.url} className="w-full h-full object-cover pointer-events-none" muted loop autoPlay playsInline />
      ) : (
        <img src={item.url} alt="Gallery item" className="w-full h-full object-cover pointer-events-none" />
      )}
      
      <div className="absolute top-2 left-2 p-1.5 bg-black/60 backdrop-blur-md rounded-lg pointer-events-none">
        {item.type === 'video' ? <Video className="w-3 h-3 text-white" /> : <ImageIcon className="w-3 h-3 text-white" />}
      </div>

      {/* Removemos el drag handle individual para poder arrastrar toda la imagen */}

      <div className="absolute inset-x-0 bottom-0 top-auto h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 pointer-events-auto">
        <button 
          onPointerDown={(e) => e.stopPropagation()} // Prevents dragging when clicking delete
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-transform hover:scale-110 shadow-lg cursor-pointer"
          title="Eliminar archivo"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function GalleryGrid({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        const updatedArray = newArray.map((item, index) => ({
          ...item,
          sort_order: index
        }));

        saveOrder(updatedArray);

        return updatedArray;
      });
    }
  };

  const saveOrder = async (newItems: GalleryItem[]) => {
    setIsSaving(true);
    try {
      const orderPayload = newItems.map(item => ({
        id: item.id,
        sort_order: item.sort_order
      }));
      await updateGalleryOrder(orderPayload);
    } catch (error: any) {
      console.error("Error saving order:", error);
      alert("Error al guardar en base de datos. Revisa la consola o asegúrate de tener permisos (RLS). " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este archivo?")) {
      setItems(items.filter(item => item.id !== id));
      await deleteGalleryItem(id);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-xl">
        <ImageIcon className="w-12 h-12 text-zinc-700 mb-4" />
        <p className="text-zinc-500 font-mono text-sm">No hay imágenes en la galería.</p>
      </div>
    );
  }

  return (
    <div>
      {isSaving && (
        <div className="mb-4 text-xs font-mono text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Guardando nuevo orden...
        </div>
      )}
      
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <SortableContext 
            items={items.map(i => i.id)}
            strategy={rectSortingStrategy}
          >
            {items.map((item) => (
              <SortableItem key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
