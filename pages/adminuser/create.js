import { Container } from "react-bootstrap";
import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button } from "react-bootstrap";
import CustomSelect from "components/CustomSelect";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomInput from "components/CustomInput";

const UserCreatePage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");
  const { showToast } = useToast();

  const validOption = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  const handleCreate = async () => {
    if (email == "") {
      showToast("Error", "Please fill email!", "failure");
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
    if (password != confirmPassword) {
      showToast(
        "Error",
        "Password should be matched with confirm password",
        "failure"
      );
      return;
    }
    if (type == "") {
      showToast("Error", "Please select status!", "failure");
      return;
    }

    await axios
      .post(`${SERVER_URL}/admin/create`, {
        email: email,
        password: password,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "Admin user has been created.", "success");
          router.push("/adminuser");
        } else {
          showToast("Error", res.data.message, "failure");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.value);
  };

  return (
    <Container fluid className="p-6">
      <PageHeading heading="Create Administrator" />
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
                      Email
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="password"
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
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="confirmPassword"
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

export default UserCreatePage;