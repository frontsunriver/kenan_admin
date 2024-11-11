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
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const countryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/vmimage/findById`, { id: id }).then((res) => {
        if (res.data.success) {
          setTitle(res.data.data.title);
          setPassword(res.data.data.password);
          setConfirmPassword(res.data.data.password);
          setDescription(res.data.data.description);
          setDownloadUrl(res.data.data.download_url);
          setType(res.data.data.is_valid);
        } else {
          // toast.error(res.data.message);
        }
      });
    }
  }, [id]);

  const handleUpdate = async () => {
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
    if (downloadUrl == "") {
      toast.error("Please fill download URL!");
      return;
    }
    if (description == "") {
      toast.error("Please fill title!");
      return;
    }
    if (type == "") {
      toast.error("Please select type!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/vmimage/update`, {
        id: id,
        title: title,
        password: password,
        description: description,
        download_url: downloadUrl,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("VM image has been updated successfully");
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
      {/* Page Heading */}
      <PageHeading heading="Update VM Image" />
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
                      Title
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        id="Title"
                        value={title}
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
                        value={password}
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
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="description"
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
                        id="description"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="fullName"
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
                        id="download-url"
                        value={downloadUrl}
                        required
                        onChange={(e) => setDownloadUrl(e.target.value)}
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
