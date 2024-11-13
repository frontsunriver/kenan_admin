import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomCheckbox from "components/CustomCheckbox";

const UserManagementPage = () => {
  const [data, setData] = useState([]);
  const [copyVM, setCopyVM] = useState(false);
  const [outBound, setOutBound] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const { id } = router.query;

  const getDataList = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/userConfig/findByUserId`, {
        user_id: id,
      });
      if (res.data.success) {
        if (res.data.data.length > 0) {
          setData(res.data.data);
          setCopyVM(res.data.data[0].copy_to_vm == 1 ? true : false);
          setOutBound(res.data.data[0].enable_outbound == 1 ? true : false);
        }
      } else {
        showToast("Error", "Error fetching user configuration", "failure");
      }
    } catch (error) {
      showToast("Error", "An unexpected error occurred", "failure");
    }
  };

  useEffect(() => {
    if (id) {
      getDataList();
    }
  }, []);

  const handleUpdate = async () => {
    await axios
      .post(`${SERVER_URL}/userConfig/update`, {
        id: id,
        copy_to_vm: copyVM ? 1 : 0,
        enable_outbound: outBound ? 1 : 0,
      })
      .then((res) => {
        if (res.data.success) {
          getDataList();
          showToast(
            "Success",
            "User configuration updated successfully",
            "success"
          );
        } else {
          showToast("Error", "An unexpected error occurred", "failure");
        }
      });
  };

  const handleCopyVMChange = () => {
    setCopyVM(!copyVM);
  };

  const handleOutBoundChange = () => {
    setOutBound(!outBound);
  };

  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <h1 className="mb-1 h2 fw-bold">User Configuration Management</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Tab.Container defaultActiveKey="design">
            <Card>
              <Card.Body className="d-flex justify-content-end gap-2">
                <Button variant="primary" onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="danger" onClick={() => router.back()}>
                  Back
                </Button>
              </Card.Body>
              <Card.Body className="p-3 d-flex gap-5">
                <CustomCheckbox
                  checked={copyVM}
                  label="Copy To VM"
                  onChange={handleCopyVMChange}
                />
                <CustomCheckbox
                  checked={outBound}
                  label="Enable OutBound"
                  onChange={handleOutBoundChange}
                />
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagementPage;
