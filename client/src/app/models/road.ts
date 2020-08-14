export interface Road {
  contract_amount: number;
  contract_duration: string;
  end: string;
  road_id: string;
  start: string;
  authority_id: string;
  collected_amount: string;
  is_active: boolean;
  road_data_from_blockchain:Array<any>;
}
