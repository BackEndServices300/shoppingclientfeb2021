export interface CreateOrder {
  pickupPerson: string;
  items: string;
}

export interface Order {
  id: string;
  pickupPerson: string;
  items: string;
  pickupTimeAssigned?: string;
}

export interface OrderWs extends Order {
  message: string;
}
