import { gql } from "@apollo/client";

export const ADD_CONTACT = gql`
    mutation AddContactWithPhones(
        $first_name: String!, 
        $last_name: String!, 
        $phones: [phone_insert_input!]!
        ) {
    insert_contact(
        objects: {
            first_name: $first_name, 
            last_name: 
            $last_name, phones: { 
                data: $phones
                }
            }
        ) {
        returning {
        first_name
        last_name
        id
        phones {
            number
        }
        }
    }
    }
`;

export const EDIT_PHONE_NUMBER = gql`
    mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number:String!) {
        update_phone_by_pk(pk_columns: $pk_columns, _set: {number: $new_phone_number}) {
        contact {
            id
            last_name
            first_name
            created_at
            phones {
            number
            }
        }
        }
    }
`;

export const ADD_PHONE_NUMBER = gql`
    mutation AddNumberToContact ($contact_id: Int!, $phone_number:String!) {
        insert_phone(objects: {contact_id: $contact_id, number: $phone_number}) {
        returning {
            contact {
            id
            last_name
            first_name
            phones {
                number
            }
            }
        }
        }
    }
`;


