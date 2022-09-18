/** @jsxImportSource @emotion/react */
import React from "react";
import { Col, Row, Layout, Button } from "antd";
import { backgroundImage, footer, layout } from "./LayoutStyle";
import "boxicons";
import { primaryButton } from "../../pages/contactListPage/ContactListStyle";

const { Content, Footer } = Layout;

type CommonLayoutProps = {
  children: React.ReactNode;
};

const LayoutComponent: React.FunctionComponent<CommonLayoutProps> = ({
  children,
}) => {
  return (
    <Layout>
      <Content css={layout}>
        <div css={backgroundImage}></div>
        <Row justify="center">
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            {children}
          </Col>
        </Row>
      </Content>
      <Footer css={footer}>
        <Row align="middle" gutter={10}>
          <Col>
            <div>Build Proudly By: Muhamad Irfan Maulana @2022 | </div>
          </Col>
          <Col>
            <Button
              size="small"
              css={primaryButton}
              shape="circle"
              style={{ marginRight: 5 }}
              icon={<i className="bx bx-fw bxl-linkedin" />}
              href="https://www.linkedin.com/in/muhamadirfanm134/"
              target="_blank"
            />
            <Button
              size="small"
              css={primaryButton}
              shape="circle"
              icon={<i className="bx bx-fw bxl-github" />}
              href="https://github.com/Muhamadirfanm134"
              target="_blank"
            />
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;
