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
import CustomInput from "components/CustomInput";

const UserDetailPage = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [type, setType] = useState("");
  const [defaultValue, setDefaultValue] = useState();
  const router = useRouter();
  const { id } = router.query;
  const { showToast } = useToast();

  const validOption = [
    { value: 1, label: "Enabled" },
    { value: 0, label: "Disabled" },
  ];

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/vmimage/findById`, { id: id }).then((res) => {
        if (res.data.success) {
          setTitle(res.data.data[0].title);
          setPassword(res.data.data[0].password);
          setConfirmPassword(res.data.data[0].password);
          setDescription(res.data.data[0].description);
          setDownloadUrl(res.data.data[0].download_url);
          setType(res.data.data[0].is_valid);
          setDefaultValue(getOptionByValue(res.data.data[0].is_valid));
        } else {
          // toast.error(res.data.message);
        }
      });
    }
  }, [id]);

  const getOptionByValue = (value) => {
    return validOption.find((option) => option.value === value) || null;
  };

  const handleUpdate = async () => {
    if (title == "") {
      showToast("Error", "Please fill title!", "failure");
      return;
    }
    if (password == "") {
      showToast("Error", "Please fill password!", "failure");
      return;
    }
    if (confirmPassword == "") {
      showToast("Error", "Please fill confirm password!", "failure");
      return;
    }
    if (confirmPassword != password) {
      showToast(
        "Error",
        "Password and confirm password should be same!",
        "failure"
      );
      return;
    }
    if (description == "") {
      showToast("Error", "Please fill description!", "failure");
      return;
    }
    if (downloadUrl == "") {
      showToast("Error", "Please fill download url!", "failure");
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
          showToast("Success", "VM Image has been updated.", "success");
          router.push("/vm_images");
        } else {
          showToast("Error", "Something went wrong", "failure");
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
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div>
                <Form>
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Title
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="text"
                        placeholder="Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Confirm Password
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="password"
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
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
                      <CustomInput
                        type="text"
                        placeholder="Description"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Download URL
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="text"
                        placeholder="Download URL"
                        required
                        onChange={(e) => setDownloadUrl(e.target.value)}
                        value={downloadUrl}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Status
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={validOption}
                        placeHolder="Select valid option"
                        onChange={handleChange}
                        className="border rounded"
                        defaultValue={defaultValue}
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

export default UserDetailPage;
