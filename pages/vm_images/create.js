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

const VMImageCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const countryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  const handleCreate = async () => {
    if (title == "") {
      toast.error("Please fill title!");
      return;
    }
    if (password == "") {
      toast.error("Please fill password!");
      return;
    }
    if (confirmPassword == "") {
      toast.error("Please fill confirm password!");
      return;
    }
    if (confirmPassword != password) {
      toast.error("Password and confirm password should be same!");
      return;
    }
    if (description == "") {
      toast.error("Please fill description!");
      return;
    }
    if (downloadUrl == "") {
      toast.error("Please fill download url!");
      return;
    }
    if (type == "") {
      toast.error("Please select status!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/vmimage/create`, {
        title: title,
        password: password,
        description: description,
        download_url: downloadUrl,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Item has been created.");
          router.push("/vm_images");
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
      <PageHeading heading="Create VM Image" />
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
                      htmlFor="Title"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Title
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        id="Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="Password"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        id="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="ConfirmPassword"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Confirm Password
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        id="ConfirmPassword"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Description
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        id="Email"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="download"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Download URL
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Download URL"
                        id="download"
                        required
                        onChange={(e) => setDownloadUrl(e.target.value)}
                      />
                    </div>
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

export default VMImageCreatePage;
