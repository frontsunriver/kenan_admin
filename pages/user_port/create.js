import { Container } from "react-bootstrap";
import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { FormSelect } from "widgets";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomSelect from "components/CustomSelect";

const UserPortCreatePage = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [portMapId, setPortMapId] = useState("");
  const [type, setType] = useState("");
  const [userOption, setUserOption] = useState([]);
  const [portOption, setPortOption] = useState([]);

  useEffect(() => {
    axios.post(`${SERVER_URL}/user/getAll`).then((res) => {
      if (res.data.success) {
        let users = [];
        res.data.data.map((user) => {
          users.push({ value: user.id, label: user.email });
        });
        setUserOption(users);
      } else {
        console.log("error");
      }
    });
    axios.post(`${SERVER_URL}/port/getAll`).then((res) => {
      if (res.data.status == 200) {
        let ports = [];
        res.data.data.data.map((port) => {
          ports.push({ value: port.id, label: port.title });
        });
        setPortOption(ports);
      } else {
        console.log("error");
      }
    });
  }, []);

  const validOption = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  const handleCreate = async () => {
    if (portMapId == "") {
      showToast("Error", "Please select port!", "failure");
      return;
    }
    if (userId == "") {
      showToast("Error", "Please select user!", "failure");
      return;
    }
    if (type == "") {
      showToast("Error", "Please select status!", "failure");
      return;
    }

    await axios
      .post(`${SERVER_URL}/userPort/create`, {
        user_id: userId,
        port_map_id: portMapId,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "Item has been created", "success");
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

  const handlePortChange = (e) => {
    setPortMapId(e.value);
  };

  return (
    <Container fluid className="p-6">
      <PageHeading heading="Create User Port" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <Card.Body>
              <div>
                <Form>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      User
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={userOption}
                        placeHolder="Select User"
                        onChange={handleUserChange}
                        className="border rounded"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Port
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={portOption}
                        placeHolder="Select Port"
                        onChange={handlePortChange}
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
                        // defaultValue={defaultSelected}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col
                      md={{ offset: 4, span: 8 }}
                      xs={8}
                      className="mt-4 d-flex justify-content-end gap-2"
                    >
                      <Button variant="primary" onClick={handleCreate}>
                        Create
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

export default UserPortCreatePage;
