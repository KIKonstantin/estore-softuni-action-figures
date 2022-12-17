import { OrderItems } from "./order-items";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { User } from '@estore/users';

export class Order {
    id?: string;
    orderItems?: OrderItems[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: string;
    totalPrice?: string;
    user!: any;
    dateOrdered?: string;
}