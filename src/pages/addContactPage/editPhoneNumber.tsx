/** @jsxImportSource @emotion/react */
import React from "react";
import { CardHeaderTwo, CardPlain } from "../../components/card/cardComponent";
import { DividerComponent } from "../../components/divider/divider";
import LayoutComponent from "../../components/layouts/layout";
import { Heading, primaryButton } from "../contactListPage/ContactListStyle";
import Swal from "sweetalert2";
import { Row, Col, Button, Form, Divider } from "antd";
import Gap from "../../components/gap";
import { cancelButton } from "./AddContactPageStyle";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { GET_CONTACT_LIST } from "../contactListPage/query";
import LoadingComponent from "../../components/loading/loading";
import { Query_Root } from "../../generated/graphql";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_PHONE_NUMBER } from "./query";

interface EditPhoneNumberProps {
  contact_data?: Query_Root;
}

type LocationState = {
  from: {
    path: string;
  };

  id: string;
  phone: string;
};

const EditPhoneNumber: React.FC<EditPhoneNumberProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const contactData = location.state as LocationState;

  const id = contactData?.id;
  const number = contactData?.phone;

  console.log(number);

  const [editPhoneNumber, { loading, error, data }] =
    useMutation(EDIT_PHONE_NUMBER);

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
      text: "Successfully Edit Phone Number!",
    }).then(() => navigate(-1));
  }

  const onFinish = (values: any) => {
    editPhoneNumber({
      variables: {
        pk_columns: {
          number: number,
          contact_id: id,
        },
        new_phone_number: `+${values.phone?.code}${values?.phone.phone}${values?.phone.short}`,
      },
      refetchQueries: [{ query: GET_CONTACT_LIST }],
    });
  };

  const phones = {
    code: number?.slice(1, 3),
    phone: number?.substring(3, number?.length - 2),
    short: number?.substring(number?.length - 2, number?.length),
  };

  return (
    <LayoutComponent>
      {/* Header Section */}
      <CardHeaderTwo>
        <Heading>Edit Phone Number</Heading>
        <DividerComponent />
      </CardHeaderTwo>

      <Gap height={10} />
      <CardPlain>
        <ConfigProvider locale={en}>
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
                name: ["phone"],
                value: phones,
              },
            ]}
          >
            <Row gutter={30}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    { required: true, message: "Please input phone number." },
                  ]}
                  initialValue={{
                    short: "id",
                  }}
                >
                  <CountryPhoneInput inline placeholder="Input mobile number" />
                </Form.Item>
              </Col>
            </Row>

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
        </ConfigProvider>
      </CardPlain>
    </LayoutComponent>
  );
};

export default EditPhoneNumber;
