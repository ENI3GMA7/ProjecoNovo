import { create } from 'zustand';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  address?: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),
  updateCustomer: (id, updates) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updates } : customer
      ),
    })),
}));