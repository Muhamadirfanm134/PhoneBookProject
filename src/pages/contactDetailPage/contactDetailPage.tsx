/** @jsxImportSource @emotion/react */
import React from "react";
import { Query_Root } from "../../generated/graphql";
import LayoutComponent from "../../components/layouts/layout";
import Gap from "../../components/gap/index";
import {
  CardFilter,
  CardHeader,
  CardPlain,
} from "../../components/card/cardComponent";
import { Heading, primaryButton } from "../contactListPage/ContactListStyle";
import { DividerComponent } from "../../components/divider/divider";
import { Row, Col, Tag, Button, Modal, Tooltip } from "antd";
import { contact, contactDetail } from "../../assets";
import { phoneNumber, sectionHeader } from "./ContactDetailStyle";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_CONTACT } from "./query";
import { GET_CONTACT_LIST } from "../contactListPage/query";
import Swal from "sweetalert2";
import LoadingComponent from "../../components/loading/loading";
import { PlusOutlined } from "@ant-design/icons";
import { redButton } from "../contactListPage/ContactListStyle";

interface ContactDetailPageProps {
  contact_data: Query_Root;
}

const ContactDetailPage: React.FC<ContactDetailPageProps> = ({
  contact_data,
}) => {
  const contactData = contact_data?.contact_by_pk;

  const navigate = useNavigate();

  const [deleteContact, { data, loading, error }] = useMutation(
    DELETE_CONTACT,
    {
      variables: {
        id: contactData?.id,
      },
      refetchQueries: [{ query: GET_CONTACT_LIST }],
    }
  );

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
    navigate("/");
  }

  const { confirm } = Modal;

  const handleDelete = () => {
    confirm({
      centered: true,
      title: "Are you sure delete this contact?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",

      onOk() {
        deleteContact();
      },
    });
  };

  let localStorageData = localStorage.getItem("favoriteList");
  let isFavorite;
  if (localStorageData) {
    isFavorite = JSON.parse(localStorageData)
      ?.map((data: any) => data?.id)
      .includes(contactData?.id);
  }

  const addToFavorite = () => {
    var favorite: Array<any> = [];

    if (localStorageData) {
      let data = JSON.parse(localStorageData);
      for (let i = 0; i < data?.length; i++) {
        favorite.push(data[i]);
      }
      favorite.push(contactData);
    } else {
      favorite.push(contactData);
    }

    localStorage.setItem("favoriteList", JSON.stringify(favorite));
    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      showCloseButton: true,
      text: `Successfully add contact to favorite List`,
    }).then(() => {
      navigate(-1);
    });
  };

  const deleteFromFavorite = () => {
    confirm({
      centered: true,
      title: "Are you sure remove this contact from favorite?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",

      onOk() {
        var favorite: Array<any> = [];
        if (localStorageData) {
          let data = JSON.parse(localStorageData);
          favorite = data?.filter((data?: any) => data.id !== contactData?.id);
        }

        localStorage.setItem("favoriteList", JSON.stringify(favorite));
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
          text: `Successfully remove contact to favorite List`,
        }).then(() => {
          navigate(-1);
        });
      },
    });
  };

  return (
    <LayoutComponent>
      {/* Header Section */}
      <CardHeader>
        <Row gutter={[40, 10]} align="middle">
          <Col xs={24} sm={24} md={5} lg={5} xl={5}>
            <img alt="Contact" src={contact} style={{ width: 150 }} />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Heading>
              {contactData?.first_name + " " + contactData?.last_name}
            </Heading>
            <DividerComponent />
            <Tag color="#333333BA" css={phoneNumber}>
              {contactData?.phones[0]?.number
                ? contactData?.phones[0]?.number
                    .substring(0, contactData?.phones[0]?.number.length - 2)
                    .replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, "$1 $2-$3-$4")
                : "-"}
            </Tag>
          </Col>
        </Row>
      </CardHeader>
      {/* Search and Filter */}
      <CardFilter>
        <Row gutter={10} justify="end">
          <Col>
            <Tooltip
              title={isFavorite ? "Delete from favorite" : "Add Favorite"}
            >
              <Button
                css={isFavorite ? primaryButton : redButton}
                shape="circle"
                icon={isFavorite ? <StarFilled /> : <StarOutlined />}
                loading={loading}
                onClick={isFavorite ? deleteFromFavorite : addToFavorite}
              />
            </Tooltip>
          </Col>
          <Col>
            <Link to="/edit-contact" state={{ ...contactData }}>
              <Button
                css={primaryButton}
                shape="circle"
                icon={<EditOutlined />}
                loading={loading}
              />
            </Link>
          </Col>
          <Col>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              loading={loading}
              onClick={() => handleDelete()}
            />
          </Col>
        </Row>
      </CardFilter>

      <Gap height={10} />

      <Row gutter={[30, 30]}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <img
            alt="Contact-Detail"
            src={contactDetail}
            style={{ width: 300 }}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Row align="middle">
            <Col span={22}>
              <div css={sectionHeader}>Phone Number</div>
              <DividerComponent />
            </Col>
            <Col span={2}>
              <Link to="/add-phone-number" state={{ id: contactData?.id }}>
                <Button
                  css={redButton}
                  shape="circle"
                  icon={<PlusOutlined />}
                  loading={loading}
                />
              </Link>
            </Col>
          </Row>

          <Gap height={40} />
          <Row gutter={[20, 10]}>
            {contactData?.phones?.map((phone) => (
              <Col span={24}>
                <CardPlain>
                  <Row align="middle">
                    <Col span={22}>
                      {phone?.number
                        ?.substring(0, phone?.number.length - 2)
                        .replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, "$1 $2-$3-$4")}
                    </Col>
                    <Col span={2}>
                      <Link
                        to="/edit-phone-number"
                        state={{ id: contactData?.id, phone: phone?.number }}
                      >
                        <Button
                          css={primaryButton}
                          shape="circle"
                          icon={<EditOutlined />}
                          loading={loading}
                        />
                      </Link>
                    </Col>
                  </Row>
                </CardPlain>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </LayoutComponent>
  );
};

export default ContactDetailPage;
