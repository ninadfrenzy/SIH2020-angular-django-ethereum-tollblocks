export interface CustomTxn{
    transaction_id: string;
    authority_id: string;
    plaza_id: string;
    booth_id: string;
    road_id: string;
    vehicle_id: string;
    vehicle_type: string;
    amount: number;
    created_at: Date;
    authority_name: string;
    start_end: string;
    plaza_location: string;
    two_way: boolean;
    is_return: boolean;
}
