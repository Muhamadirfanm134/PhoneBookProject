import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactList from "../../pages/contactListPage";
import AddContactPage from "../../pages/addContactPage/addContactPage";
import ContactDetailContainer from "../../pages/contactDetailPage";
import EditContactPage from "../../pages/addContactPage/editContactPage";
import EditPhoneNumber from "../../pages/addContactPage/editPhoneNumber";
import AddPhoneNumber from "../../pages/addContactPage/addPhoneNumber";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/add-contact" element={<AddContactPage />} />
        <Route path="/contact-detail" element={<ContactDetailContainer />} />
        <Route path="/edit-contact" element={<EditContactPage />} />
        <Route path="/edit-phone-number" element={<EditPhoneNumber />} />
        <Route path="/add-phone-number" element={<AddPhoneNumber />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
