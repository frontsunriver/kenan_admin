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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const countryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/user/findById`, { id: id }).then((res) => {
        if (res.data.success) {
          setName(res.data.data.name);
          setEmail(res.data.data.email);
          setType(res.data.data.is_valid);
        } else {
          // toast.error(res.data.message);
        }
      });
    }
  }, [id]);

  const handleUpdate = async () => {
    if (name == "") {
      toast.error("Please fill name!");
      return;
    }
    if (email == "") {
      toast.error("Please fill email!");
      return;
    }
    if (type == "") {
      toast.error("Please select type!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/user/update`, {
        id: id,
        name: name,
        email: email,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("User has been updated successfully");
          router.push("/user");
        } else {
          console.log("error");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Update user" />
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
                      Name
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        id="Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        id="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Type
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <Form.Control
                        as={FormSelect}
                        placeholder="Select Type"
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
