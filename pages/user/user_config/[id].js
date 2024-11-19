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
  const [copyTextToVm, setCopyTextToVm] = useState(false);
  const [copyTextFromVm, setCopyTextFromVm] = useState(false);
  const [copyFileToVm, setCopyFileToVm] = useState(false);
  const [copyFileFromVm, setCopyFileFromVm] = useState(false);
  const [allowScreenshot, setAllowScreenshot] = useState(false);
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
          setCopyTextToVm(res.data.data[0].copy_text_to_vm == 1 ? true : false);
          setCopyTextFromVm(
            res.data.data[0].copy_text_from_vm == 1 ? true : false
          );
          setCopyFileToVm(res.data.data[0].copy_file_to_vm == 1 ? true : false);
          setCopyFileFromVm(
            res.data.data[0].copy_file_from_vm == 1 ? true : false
          );
          setAllowScreenshot(
            res.data.data[0].allow_screenshot == 1 ? true : false
          );
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
        copy_file_to_vm: copyFileToVm ? 1 : 0,
        copy_file_from_vm: copyFileFromVm ? 1 : 0,
        copy_text_to_vm: copyTextToVm,
        copy_text_from_vm: copyTextFromVm,
        allow_screenshot: allowScreenshot,
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

  const handleCopyTextToVM = () => {
    setCopyTextToVm(!copyTextToVm);
  };

  const handleCopyTextFromVM = () => {
    setCopyTextFromVm(!copyTextFromVm);
  };

  const handleCopyFileFromVM = () => {
    setCopyFileFromVm(!copyFileFromVm);
  };

  const handleCopyFileToVM = () => {
    setCopyFileToVm(!copyFileToVm);
  };

  const handleAllowScreenshot = () => {
    setAllowScreenshot(!allowScreenshot);
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
                  checked={copyTextToVm}
                  label="Copy Text To VM"
                  onChange={handleCopyTextToVM}
                />
                <CustomCheckbox
                  checked={copyTextFromVm}
                  label="Copy Text From VM"
                  onChange={handleCopyTextFromVM}
                />
                <CustomCheckbox
                  checked={copyFileToVm}
                  label="Copy File To VM"
                  onChange={handleCopyFileToVM}
                />
                <CustomCheckbox
                  checked={copyFileFromVm}
                  label="Copy File From VM"
                  onChange={handleCopyFileFromVM}
                />
                <CustomCheckbox
                  checked={allowScreenshot}
                  label="Allow Screenshot"
                  onChange={handleAllowScreenshot}
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
