/** @jsxImportSource @emotion/react */
import React from "react";
import { CardHeaderTwo, CardPlain } from "../../components/card/cardComponent";
import { DividerComponent } from "../../components/divider/divider";
import LayoutComponent from "../../components/layouts/layout";
import { Heading, primaryButton } from "../contactListPage/ContactListStyle";
import Swal from "sweetalert2";
import { Row, Col, Button, Form, Input, Divider } from "antd";
import Gap from "../../components/gap";
import { cancelButton } from "./AddContactPageStyle";
import { useNavigate, useLocation } from "react-router-dom";
import { GET_CONTACT_LIST } from "../contactListPage/query";
import LoadingComponent from "../../components/loading/loading";
import { EDIT_CONTACT } from "../contactDetailPage/query";
import { Query_Root } from "../../generated/graphql";
import { useMutation } from "@apollo/react-hooks";

interface EditContactPageProps {
  contact_data?: Query_Root;
}

interface EnumServiceItem {
  number?: string;
}

type LocationState = {
  from: {
    path: string;
  };
  id?: string;
  first_name?: string;
  last_name?: string;
  phones: Array<EnumServiceItem>;
};

const EditContactPage: React.FC<EditContactPageProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const contactData = location.state as LocationState;

  const [editContact, { loading, error, data }] = useMutation(EDIT_CONTACT);

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

  if (data) {
    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      showCloseButton: true,
      text: "Successfully Edit Contact!",
    }).then(() => navigate(-1));
  }

  const onFinish = (values: any) => {
    console.log({ values });
    editContact({
      variables: {
        id: contactData?.id,
        _set: {
          first_name: values?.first_name,
          last_name: values?.last_name,
        },
      },
      refetchQueries: [{ query: GET_CONTACT_LIST }],
    });
  };

  const phones = contactData?.phones?.map((phone) => ({
    code: phone?.number?.slice(1, 3),
    phone: phone?.number?.substring(3, phone?.number?.length - 2),
    short: phone?.number?.substring(
      phone?.number?.length - 2,
      phone?.number?.length
    ),
  }));

  return (
    <LayoutComponent>
      {/* Header Section */}
      <CardHeaderTwo>
        <Heading>Edit Contact</Heading>
        <DividerComponent />
      </CardHeaderTwo>

      <Gap height={10} />
      <CardPlain>
        <Form
          name="add-contact"
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          fields={[
            {
              name: ["first_name"],
              value: contactData && contactData.first_name,
            },
            {
              name: ["last_name"],
              value: contactData && contactData.last_name,
            },
            {
              name: ["phones"],
              value: contactData && phones,
            },
          ]}
        >
          <Row gutter={30}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  {
                    pattern: new RegExp(/^[a-zA-Z0-9/\s/g]*$/),
                    message: "No Special Characters Allowed",
                  },
                  { required: true, message: "Please input first name." },
                ]}
              >
                <Input placeholder="Input first name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                  {
                    pattern: new RegExp(/^[a-zA-Z0-9/\s/g]*$/),
                    message: "No Special Characters Allowed",
                  },
                  { required: true, message: "Please input last name." },
                ]}
              >
                <Input placeholder="Input last name" />
              </Form.Item>
            </Col>
          </Row>

          <Gap height={15} />

          <Divider />
          <Row gutter={12}>
            <Col span={8}>
              <Button
                css={primaryButton}
                shape="round"
                block
                htmlType="submit"
                loading={loading}
              >
                Save
              </Button>
            </Col>
            <Col span={8}>
              <Button
                css={cancelButton}
                block
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </CardPlain>
    </LayoutComponent>
  );
};

export default EditContactPage;
