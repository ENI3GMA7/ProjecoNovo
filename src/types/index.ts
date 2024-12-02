export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'matabicho' | 'almoco' | 'lanche' | 'jantar';
  image: string;
  isSpecialOfDay?: boolean;
}

export interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Admin {
  username: string;
  password: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}