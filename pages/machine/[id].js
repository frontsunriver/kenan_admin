import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";

import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";

import { FormSelect } from "widgets";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetailPage = () => {
  const [machineId, setMachineId] = useState("");
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const countryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

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
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      axios
        .post(`${SERVER_URL}/usermachine/findById`, { id: id })
        .then((res) => {
          if (res.data.success) {
            setMachineId(res.data.data[0].machine_id);
            setUserId(res.data.data[0].user_id);
            setType(res.data.data[0].is_valid);
          } else {
            // toast.error(res.data.message);
          }
        });
    }
  }, [id]);

  const handleUpdate = async () => {
    if (machineId == "") {
      toast.error("Please fill machine id!");
      return;
    }
    if (userId == "") {
      toast.error("Please select user id!");
      return;
    }
    if (type == "") {
      toast.error("Please select status!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/usermachine/update`, {
        id: id,
        machine_id: machineId,
        user_id: userId,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Item has been updated successfully");
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
      {/* Page Heading */}
      <PageHeading heading="Update User Machine" />
      <ToastContainer />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div>
                <Form>
                  {/* row */}
                  <Row className="mb-3">
                    <label
                      htmlFor="fullName"
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
                        id="machine id"
                        value={machineId}
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
                        value={userId}
                        options={userOptions}
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
                        value={type}
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
                      <Button variant="primary" onClick={handleUpdate}>
                        Update
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

export default UserDetailPage;
