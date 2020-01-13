import React from "react";
import { Modal } from "antd";
import Form from "./Form";

class AddChatModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          centered
          footer={null}
          visible={this.props.isVisible}
          onCancel={this.props.close}
        >
          <Form />
        </Modal>
      </div>
    );
  }
}

export default AddChatModal;
