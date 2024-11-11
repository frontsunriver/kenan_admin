import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { FormSelect } from "widgets";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCreatePage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const countryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  const handleCreate = async () => {
    if (email == "") {
      toast.error("Please fill email!");
      return;
    }
    if (type == "") {
      toast.error("Please select type!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/user/create`, {
        name: name,
        email: email,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("User has been created. Password is 123456789");
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
      <PageHeading heading="Create Users" />
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
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      email
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        id="Email"
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

export default UserCreatePage;
