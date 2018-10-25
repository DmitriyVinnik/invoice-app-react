export interface Customer {
    id?: number,
    name: string,
    address: string,
    phone: string,
}

export interface CustomersState {
    data: Customer[];
    activeCustomerId: number | null,
}

export const initialState: CustomersState = {
    data: [],
    activeCustomerId: null,
};
