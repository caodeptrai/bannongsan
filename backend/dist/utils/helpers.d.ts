export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
export declare const generateToken: (payload: any) => string;
export declare const verifyToken: (token: string) => any;
export declare const generateOrderNumber: () => string;
export declare const slugify: (text: string) => string;
export declare const paginate: (page: number, limit: number) => {
    skip: number;
    take: number;
};
export declare const formatCurrency: (amount: number) => string;
export declare const calculateShippingFee: (subtotal: number) => number;
//# sourceMappingURL=helpers.d.ts.map