import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { IContactMutation, IContacts } from "./types/Contact";

export function useTodoQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IContacts>(gqlQuery);
  return { loading, error, data };
}

export function useTodoMutation(gqlQuery: DocumentNode) {
  const [addContact] = useMutation<IContactMutation>(gqlQuery);
  return [addContact];
}
