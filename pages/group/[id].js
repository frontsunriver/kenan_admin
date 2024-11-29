import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomSelect from "components/CustomSelect";
import CustomInput from "components/CustomInput";

const PortDetailPage = () => {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [defaultOptionValue, setDefaultOptionValue] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const validOption = [
    { value: 1, label: "Enabled" },
    { value: 0, label: "Disabled" },
  ];

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/group/findById`, { id: id }).then((res) => {
        if (res.data.status == 200) {
          setName(res.data.data.data[0].name);
          setDefaultOptionValue(
            getOptionByValue(res.data.data.data[0].is_valid)
          );
          setType(res.data.data.data[0].is_valid);
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
    if (name == "") {
      showToast("Error", "Please fill name!", "failure");
      return;
    }

    await axios
      .post(`${SERVER_URL}/group/update`, {
        id: id,
        name: name,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "Group has been updated.", "success");
          router.push("/group");
        } else {
          console.log("error");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.value);
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Update Group" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div>
                <Form>
                  <Row className="">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Name
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomInput
                        type="text"
                        placeholder="Group Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        placeHolder="Select status option"
                        onChange={handleChange}
                        className="border rounded"
                        defaultValue={defaultOptionValue}
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

export default PortDetailPage;
