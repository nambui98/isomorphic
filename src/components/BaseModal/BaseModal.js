import { Button, Modal } from "antd";
import React, { useState } from "react";
import ModalStyle from "./BaseModal.style";

const BaseModal = ({ open, setOpen, children, onSubmit, destroyOnClose, title, okText }) => {
  const handleOk = () => {
    onSubmit();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <ModalStyle>
      <Modal destroyOnClose={destroyOnClose} className="modal-primary" style={{ overflow: "auto" }} title={title} visible={open} okText={okText} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </ModalStyle>
  );
};

export default BaseModal;
