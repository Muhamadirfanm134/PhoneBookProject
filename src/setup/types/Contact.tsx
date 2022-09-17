interface EnumServiceItem {
  number?: number;
}

export interface IContact {
  id?: string;
  firstName?: string;
  lastName?: string;
  phones?: Array<EnumServiceItem>;
}

export interface IContacts {
  getContacts: IContact[];
}

export type IContactMutation = {
  addContact: IContact;
};
