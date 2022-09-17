import ContactList from "./contactListPage";
import { useQuery } from "@apollo/react-hooks";
import { GET_CONTACT_LIST } from "./query";
import LoadingComponent from "../../components/loading/loading";
import Swal from "sweetalert2";

const LaunchListContainer = () => {
  const { data, error, loading } = useQuery(GET_CONTACT_LIST);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    Swal.fire({
      icon: "warning",
      showConfirmButton: false,
      showCloseButton: true,
      text: `Something error! ${error.message}`,
    });
  }

  const mutatedData = (() => {
    return data;
  })();

  return <ContactList data={mutatedData} />;
};

export default LaunchListContainer;
