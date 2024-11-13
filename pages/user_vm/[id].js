import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";

import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";

import { FormSelect } from "widgets";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomSelect from "components/CustomSelect";

const UserPortDetail = () => {
  const { showToast } = useToast();
  const [vmId, setVMId] = useState("");
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [vmImageOption, setVmImageOption] = useState([]);
  const [defaultUserOption, setDefaultUserOption] = useState(null);
  const [defaultVMImageOption, setDefaultVMImageOption] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const validOption = [
    { value: 1, label: "Enabled" },
    { value: 0, label: "Disabled" },
  ];

  const getOptionByValue = (value) => {
    return validOption.find((option) => option.value === value) || null;
  };

  const getUserOptionValue = (value) => {
    return userOptions.find((option) => option.value === value) || null;
  };

  const getVMImageOptionValue = (value) => {
    return vmImageOption.find((option) => option.value === value) || null;
  };

  useEffect(() => {
    axios.post(`${SERVER_URL}/user/getAll`).then((res) => {
      if (res.data.success) {
        let users = [];
        res.data.data.map((user) => {
          users.push({ value: user.id, label: user.email });
        });
        setUserOptions(users);
      } else {
        console.log("error");
      }
    });
    axios.post(`${SERVER_URL}/vmimage/getAll`).then((res) => {
      if (res.data.success) {
        let ports = [];
        res.data.data.map((image) => {
          ports.push({ value: image.id, label: image.title });
        });
        setVmImageOption(ports);
      } else {
        console.log("error");
      }
    });
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/uservm/findById`, { id: id }).then((res) => {
        if (res.data.status == 200) {
          setVMId(res.data.data.data.vm_image_id);
          setUserId(res.data.data.data.user_id);
          setType(res.data.data.data.is_valid);
          setDefaultVMImageOption(
            getVMImageOptionValue(res.data.data.data.vm_image_id)
          );
          setDefaultUserOption(getUserOptionValue(res.data.data.data.user_id));
          setDefaultStatus(getOptionByValue(res.data.data.data.is_valid));
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
    }
  }, [id, vmImageOption, userOptions]);

  const handleUpdate = async () => {
    await axios
      .post(`${SERVER_URL}/uservm/update`, {
        id: id,
        vm_image_id: vmId,
        user_id: userId,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "Item has been updated successfully", "success");
          router.push("/user_vm");
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.value);
  };

  const handleUserChange = (e) => {
    setUserId(e.value);
  };

  const handleVmImageChange = (e) => {
    setVMId(e.value);
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Update User VM" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div>
                <Form>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      User
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={userOptions}
                        placeHolder="Select User"
                        onChange={handleUserChange}
                        className="border rounded"
                        defaultValue={defaultUserOption}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      VM Image
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={vmImageOption}
                        placeHolder="Select VM Image"
                        onChange={handleVmImageChange}
                        defaultValue={defaultVMImageOption}
                        className="border rounded"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Status
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={validOption}
                        placeHolder="Select Status"
                        onChange={handleChange}
                        className="border rounded"
                        defaultValue={defaultStatus}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col
                      md={{ offset: 4, span: 8 }}
                      xs={8}
                      className="mt-4 d-flex justify-content-end gap-2"
                    >
                      <Button variant="primary" onClick={handleUpdate}>
                        Update
                      </Button>
                      <Button variant="danger" onClick={() => router.back()}>
                        Back
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPortDetail;
