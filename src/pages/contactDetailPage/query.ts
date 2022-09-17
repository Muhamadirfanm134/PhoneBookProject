import { gql } from "@apollo/client";

export const GET_CONTACT_DETAIL = gql`
    query GetContactDetail($id: Int!){
        contact_by_pk(id: $id) {
        last_name
        id
        first_name
        created_at
        phones {
        number
        }
    }
    }
`;

export const DELETE_CONTACT = gql`
    mutation MyMutation($id: Int!) {
        delete_contact_by_pk(id: $id) {
        first_name
        last_name
        id
        }
    }  
`;

export const EDIT_CONTACT = gql`
    mutation EditContactById($id: Int!, $_set: contact_set_input) {
        update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
            id
            first_name
            last_name
            phones {
                number
            }
        }
    }
`;
