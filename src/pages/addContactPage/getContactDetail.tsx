import { useQuery } from "@apollo/client";
import * as React from "react";
import Swal from "sweetalert2";
import LoadingComponent from "../../components/loading/loading";
import { GET_CONTACT_DETAIL } from "../contactDetailPage/query";

interface GetContactDetailProps {
  id: any;
}

const GetContactDetail: React.FC<GetContactDetailProps> = ({ id }) => {
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

  return data;
};

export default GetContactDetail;
