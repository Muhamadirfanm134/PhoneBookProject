/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Avatar from "react-avatar";
import LayoutComponent from "../../components/layouts/layout";
import { Divider, Input, Pagination, PaginationProps } from "antd";
import { DividerComponent } from "../../components/divider/divider";
import {
  CardComponent,
  CardFilter,
  CardHeader,
  CardPlain,
} from "../../components/card/cardComponent";
import { contact1, notFound, searchIcon } from "../../assets";
import {
  Heading,
  nameCard,
  subTitle,
  phoneNumber,
  primaryButton,
  searchComponent,
} from "./ContactListStyle";
import { Col, Row, Button, Tag } from "antd";
import { GetContactListQuery } from "../../generated/graphql";
import { Link, useNavigate } from "react-router-dom";
import { divider, notFoundStyle } from "./ContactListStyle";
import Gap from "../../components/gap";

interface ContactListProps {
  data: GetContactListQuery;
}

const ContactList: React.FC<ContactListProps> = ({ data }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(12);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const numEachPage = 12;

  const onChange: PaginationProps["onChange"] = (value) => {
    setCurrentPage(value);
    setMinValue((value - 1) * numEachPage);
    setMaxValue(value * numEachPage);
  };

  const [dataValue, setDataValue] = useState([...data?.contact]);

  const total = dataValue?.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearch(true);
    setSearch(e.target.value);
    searchContact(e.target.value);
  };

  const searchContact = (value: any) => {
    let newContact = [...data?.contact];
    setDataValue(
      newContact?.filter((contact) => {
        const contactName = contact?.first_name + " " + contact?.last_name;
        const isMatch = contactName
          .toLowerCase()
          .includes(value?.toLowerCase());
        return isMatch;
      })
    );

    if (search === "") {
      setIsSearch(false);
    }
    setCurrentPage(1);
    setMinValue(0);
    setMaxValue(12);
  };

  const contactsData = search ? dataValue : data?.contact;

  return (
    <LayoutComponent>
      {/* Header Section */}
      <CardHeader>
        <Heading>Phone Book App</Heading>
        <div css={subTitle}>Manage your contact</div>
        <DividerComponent />
        <Row>
          <Col xs={12} sm={6} md={6} lg={6} xl={4}>
            <Button
              block
              css={primaryButton}
              onClick={() => {
                navigate("/add-contact");
              }}
            >
              Add Contact
            </Button>
          </Col>
        </Row>
      </CardHeader>

      {/* Search and Filter */}
      <CardFilter>
        <Input
          css={searchComponent}
          placeholder="Type your keyword"
          prefix={<img src={searchIcon} />}
          value={search}
          onChange={handleSearchChange}
        />
      </CardFilter>

      {/* Content Section */}
      {total > 0 ? (
        <>
          <Row gutter={[20, 0]}>
            {contactsData.slice(minValue, maxValue).map((data, index) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
                <Link
                  to={{
                    pathname: `/contact-detail`,
                    search: `id=${data?.id}`,
                  }}
                >
                  <CardComponent>
                    <Row gutter={[40, 10]}>
                      <Col xs={5} sm={24} md={5} lg={5} xl={5}>
                        <Avatar
                          size="90"
                          color="#14a01d"
                          src={contact1}
                          name={data?.first_name + " " + data?.last_name}
                          round={true}
                          textMarginRatio={0.15}
                          style={{ marginTop: "-10px", marginLeft: "-10px" }}
                        />
                      </Col>
                      <Col xs={18} sm={24} md={18} lg={18} xl={18}>
                        <div css={nameCard}>
                          {data?.first_name + " " + data?.last_name}
                        </div>
                        <Divider css={divider} />

                        <Tag color="#333333BA" css={phoneNumber}>
                          {data?.phones[0]?.number
                            ? data?.phones[0]?.number
                                .substring(
                                  0,
                                  data?.phones[0]?.number.length - 2
                                )
                                .replace(
                                  /(\d{2})(\d{3})(\d{4})(\d{4})/,
                                  "$1 $2-$3-$4"
                                )
                            : "-"}
                        </Tag>
                      </Col>
                    </Row>
                  </CardComponent>
                </Link>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={12}
            onChange={onChange}
            total={total}
          />
        </>
      ) : (
        <>
          <Gap height={20} />
          <CardPlain css={notFoundStyle}>
            <img src={notFound} />
            <div>Contact Not Found</div>
          </CardPlain>
        </>
      )}
    </LayoutComponent>
  );
};

export default ContactList;
