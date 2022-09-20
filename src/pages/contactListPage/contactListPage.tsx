/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
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
  favoriteTag,
  favoriteTitle,
} from "./ContactListStyle";
import { Col, Row, Button, Tag } from "antd";
import { GetContactListQuery, Query_Root } from "../../generated/graphql";
import { Link, useNavigate } from "react-router-dom";
import {
  divider,
  notFoundStyle,
  contactIcon,
  searchIconStyle,
} from "./ContactListStyle";
import Gap from "../../components/gap";
import { StarFilled } from "@ant-design/icons";

interface ContactListProps {
  data: GetContactListQuery;
  favoriteList?: Array<Query_Root>;
}

const ContactList: React.FC<ContactListProps> = ({ data }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const numEachPage = 10;

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

  let localStorageData = localStorage.getItem("favoriteList");
  let favoriteData;
  if (localStorageData) {
    favoriteData = JSON.parse(localStorageData);
  }

  const [favoriteList] = useState(favoriteData);
  const favorite_ListData = [...favoriteList].sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

  const contact_ListData = [...data?.contact]
    .sort((a, b) => a.first_name.localeCompare(b.first_name))
    .filter(
      (contact) =>
        !favoriteList?.map((data: any) => data?.id).includes(contact?.id)
    );

  const contactList = [...favorite_ListData, ...contact_ListData];

  const searchContact = (value: any) => {
    setDataValue(
      contactList?.filter((contact) => {
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
    setMaxValue(10);
  };

  const contactsData = isSearch ? dataValue : contactList;

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
          prefix={
            <img alt="Search-Icon" src={searchIcon} css={searchIconStyle} />
          }
          value={search}
          onChange={handleSearchChange}
        />
      </CardFilter>

      {/* Content Section */}
      {total > 0 ? (
        <>
          <Row gutter={[20, 0]}>
            {contactsData.slice(minValue, maxValue).map((data, index) => {
              let isFavorite = favoriteList
                ?.map((data: any) => data?.id)
                .includes(data?.id);

              return (
                <>
                  {currentPage === 1 && favorite_ListData && index === 0 && (
                    <Col span={24}>
                      <div css={favoriteTitle}>Favorite List</div>
                      <Gap height={15} />
                    </Col>
                  )}
                  {currentPage === 1 && index === favorite_ListData?.length && (
                    <>
                      <Divider />
                    </>
                  )}
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
                    <Link
                      to={{
                        pathname: `/contact-detail`,
                        search: `id=${data?.id}`,
                      }}
                    >
                      <CardComponent>
                        {isFavorite && (
                          <Row justify="end">
                            <Col span={24}>
                              <div css={favoriteTag}>
                                <StarFilled /> Favorite
                              </div>
                              <Gap height={10} />
                            </Col>
                          </Row>
                        )}

                        <Row gutter={[40, 10]}>
                          <Col xs={5} sm={24} md={5} lg={5} xl={5}>
                            <img
                              alt="Contact-Icon"
                              src={contact1}
                              css={contactIcon}
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
                </>
              );
            })}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={10}
            onChange={onChange}
            total={total}
          />
        </>
      ) : (
        <>
          <Gap height={20} />
          <CardPlain css={notFoundStyle}>
            <img alt="Not-Found" src={notFound} />
            <div>Contact Not Found</div>
          </CardPlain>
        </>
      )}
    </LayoutComponent>
  );
};

export default ContactList;
