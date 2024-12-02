import { create } from 'zustand';
import { MenuItem } from '../types';
import { menuItems as initialMenuItems } from '../data/menuItems';

interface MenuState {
  menuItems: MenuItem[];
  specialItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  addSpecialItem: (item: MenuItem) => void;
  removeSpecialItem: (id: string) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menuItems: initialMenuItems,
  specialItems: [],
  addMenuItem: (item) =>
    set((state) => ({
      menuItems: [...state.menuItems, item],
    })),
  addSpecialItem: (item) =>
    set((state) => ({
      specialItems: [...state.specialItems, { ...item, isSpecialOfDay: true }],
    })),
  removeSpecialItem: (id) =>
    set((state) => ({
      specialItems: state.specialItems.filter((item) => item.id !== id),
    })),
  updateMenuItem: (updatedItem) =>
    set((state) => ({
      menuItems: state.menuItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),
  deleteMenuItem: (id) =>
    set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== id),
    })),
}));