// Data model.
// Data model should form user interface

export interface IOpenAPIDictionaryElement {
  id: string | number;
  code?: string;
  title?: string;
  cnt?: number;
  image?: string;
}

export interface IOpenAPIDictionary {
  /**
   * @description ref: reference to the object in data; list: list of objects;
   */
  type: "ref" | "list" | "number" | "date" | string;
  min?: string;
  minEpoch?: number;
  max?: string;
  maxEpoch?: number;
  data?: IOpenAPIDictionaryElement[];
}

export interface IDictionary {
  warehouseId: IOpenAPIDictionary;
  productIds: IOpenAPIDictionary;
  status: IOpenAPIDictionary;
  depositorsAccountsIds: IOpenAPIDictionary;
  dateOrder: IOpenAPIDictionary;
  createdAt: IOpenAPIDictionary;
  modifiedAt: IOpenAPIDictionary;
  type: IOpenAPIDictionary;
}

export interface ShipContact {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
}

export interface Address {
  country: string;
  state: string;
  postalCode: string;
  city: string;
  streetLine1?: string | null;
  streetLine2?: string | null;
  streetLine3?: string | null;
  addressType?: string;
  lat?: number;
  lng?: number;
  isVerified: boolean;
}

export interface WarehouseOrder {
  id: number;
  warehouseId: number;
  depositorsAccountsIds?: number[];
  productIds?: number[];
  type: string;
  code: string;
  references: string[];
  notes?: string;
  status?: string;
  statusesExtended: string;
  shipperAddress?: Address;
  recipientAddress?: Address;
  shipperContact?: ShipContact;
  recipientContact?: ShipContact;
  date: string;
  createdAt: string;
  modifiedAt: string;
  deletedAt?: string;
}

export interface WareHousesOrdersResponse {
  orders: WarehouseOrder[];
  dictionaries: IDictionary;
  total: number;
  offset: number;
  limit: number;
}

export interface Criteria {
  warehouseId?: number[];
  productIds?: number[];
  depositorsAccountsIds?: number[];
  type?: string[];
  status?: string[];
  code?: string;
  dateOrderStart?: Date;
  dateOrderEnd?: Date;
  showDeleted?: boolean;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  modifiedAtStart?: Date;
  modifiedAtEnd?: Date;
}

export interface WareHousesOrdersRequest extends Criteria {
  sortBy?: "id" | "code" | "createdAt" | "modifiedAt";
  sortDir?: "ASC" | "DESC";
  offset?: number;
  limit?: number;
}
