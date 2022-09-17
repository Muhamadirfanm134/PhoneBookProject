import { useQuery } from "@apollo/react-hooks";
import { GET_CONTACT_DETAIL } from "./query";
import ContactDetailPage from "./contactDetailPage";
import LoadingComponent from "../../components/loading/loading";
import Swal from "sweetalert2";

const ContactDetailContainer = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");

  const { data, error, loading } = useQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: id,
    },
  });

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

  return <ContactDetailPage contact_data={data} />;
};

export default ContactDetailContainer;
