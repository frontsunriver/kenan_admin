import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { FormSelect } from "widgets";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MachineCreatePage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [machineId, setMachineId] = useState("");
  const [type, setType] = useState("");
  const [userOption, setUserOption] = useState([]);

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
  }, []);

  const countryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  const handleCreate = async () => {
    if (machineId == "") {
      toast.error("Please fill machine!");
      return;
    }
    if (userId == "") {
      toast.error("Please select user!");
      return;
    }
    if (type == "") {
      toast.error("Please select status!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/usermachine/create`, {
        user_id: userId,
        machine_id: machineId,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Item has been created.");
          router.push("/machine");
        } else {
          console.log("error");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleUserChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <Container fluid className="p-6">
      <PageHeading heading="Create User Machine" />
      <ToastContainer />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <Card.Body>
              <div>
                <Form>
                  <Row className="mb-3">
                    <label
                      htmlFor="Title"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Machine ID
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Machine ID"
                        id="machineId"
                        required
                        onChange={(e) => setMachineId(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      User
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <Form.Control
                        as={FormSelect}
                        placeholder="Select User"
                        id="user"
                        options={userOption}
                        onChange={(e) => {
                          handleUserChange(e);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Status
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <Form.Control
                        as={FormSelect}
                        placeholder="Select Status"
                        id="country"
                        options={countryOptions}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col
                      md={{ offset: 4, span: 8 }}
                      xs={8}
                      className="mt-4 d-flex justify-content-end "
                    >
                      <Button variant="primary" onClick={handleCreate}>
                        Create
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

export default MachineCreatePage;
