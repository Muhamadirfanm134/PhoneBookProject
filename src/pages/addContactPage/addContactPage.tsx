/** @jsxImportSource @emotion/react */
import React from "react";
import { CardHeaderTwo, CardPlain } from "../../components/card/cardComponent";
import { DividerComponent } from "../../components/divider/divider";
import LayoutComponent from "../../components/layouts/layout";
import { Heading, primaryButton } from "../contactListPage/ContactListStyle";
import Swal from "sweetalert2";
import { Row, Col, Button, Form, Input, Divider } from "antd";
import Gap from "../../components/gap";
import { cancelButton, inputPhone, redButton } from "./AddContactPageStyle";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ADD_CONTACT } from "./query";
import { GET_CONTACT_LIST } from "../contactListPage/query";
import LoadingComponent from "../../components/loading/loading";
import { EDIT_CONTACT } from "../contactDetailPage/query";
import { Query_Root } from "../../generated/graphql";
import { useMutation } from "@apollo/client";

interface AddContactPageProps {
  contact_data?: Query_Root;
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 0,
    },
  },
};

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

const AddContactPage: React.FC<AddContactPageProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const contactData = location.state as LocationState;

  console.log(contactData);

  const [addContact, { loading, error, data }] = useMutation(ADD_CONTACT);

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
      text: "Successfully Create Contact!",
    }).then(() => navigate("/"));
  }

  const onFinish = (values: any) => {
    console.log({ values });
    addContact({
      variables: {
        first_name: values?.first_name,
        last_name: values?.last_name,
        phones: values?.phones?.map((phone: any) => ({
          number: `+${phone?.code}${phone?.phone}${phone?.short}`,
        })),
      },
      refetchQueries: [{ query: GET_CONTACT_LIST }],
    });
  };

  const OnEdit = (values: any) => {
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

    editContact({
      variables: {
        id: 1,
        _set: {
          first_name: values?.first_name,
          last_name: values?.last_name,
          phones: values?.phones?.map((phone: any) => ({
            number: `+${phone?.code}${phone?.phone}${phone?.short}`,
          })),
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
        <Heading>{contactData ? "Edit Contact" : "Add Contact"}</Heading>
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
            onFinish={contactData ? OnEdit : onFinish}
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

            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List name="phones">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          {...(index === 0
                            ? formItemLayout
                            : formItemLayoutWithOutLabel)}
                          label={index === 0 ? "Phone Number" : ""}
                          required={true}
                          key={field.key}
                          css={inputPhone}
                        >
                          <Row gutter={[20, 0]}>
                            <Col xs={20} sm={20} md={22} lg={22} xl={22}>
                              <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onOk"]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      " Please add phone number or delete this field.",
                                  },
                                ]}
                                initialValue={{
                                  short: "id",
                                }}
                              >
                                <CountryPhoneInput
                                  inline
                                  placeholder="Input mobile number"
                                />
                              </Form.Item>
                            </Col>

                            {fields.length > 1 ? (
                              <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Button
                                  shape="circle"
                                  onClick={() => remove(field.name)}
                                  icon={<MinusCircleOutlined />}
                                />
                              </Col>
                            ) : null}
                          </Row>
                        </Form.Item>
                      ))}
                      <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button
                          css={redButton}
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          shape="round"
                        >
                          Add Phone Number
                        </Button>

                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
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
                    navigate("/");
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

export default AddContactPage;
