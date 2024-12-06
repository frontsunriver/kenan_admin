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
  const [email, setEmail] = useState("");
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
      axios.post(`${SERVER_URL}/user/findById`, { id: id }).then((res) => {
        if (res.data.success) {
          setEmail(res.data.data[0].email);
          setDefaultValue(getOptionByValue(res.data.data[0].is_valid));
          setType(res.data.data[0].is_valid);
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
    }
  }, [id]);

  const getOptionByValue = (value) => {
    return validOption.find((option) => option.value === value) || null;
  };

  const handleUpdate = async () => {
    if (email == "") {
      showToast("Error", "Please fill email!", "failure");
      return;
    }

    await axios
      .post(`${SERVER_URL}/user/update`, {
        id: id,
        email: email,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "User has been updated.", "success");
          router.push("/user");
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.value);
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Update user" />
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
                        value={email}
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
                        value={type}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col
                      md={{ offset: 4, span: 8 }}
                      xs={8}
                      className="mt-4 d-flex justify-content-end gap-2"
                    >
                      <Button variant="green-secondary" onClick={handleUpdate}>
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
