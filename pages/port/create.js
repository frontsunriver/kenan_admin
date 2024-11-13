import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { FormSelect } from "widgets";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomInput from "components/CustomInput";
import CustomSelect from "components/CustomSelect";

const PortCreatePage = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [https, setHttps] = useState(0);
  const [title, setTitle] = useState("");
  const [listenPort, setListenPort] = useState("");
  const [targetIp, setTargetIp] = useState("");
  const [targetPort, setTargetPort] = useState("");
  const [type, setType] = useState("");

  const validOption = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  const httpsOption = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ];

  const handleCreate = async () => {
    if (title == "") {
      showToast("Error", "Please fill title!", "failure");
      return;
    }
    if (listenPort == "") {
      showToast("Error", "Please fill listen port!", "failure");
      return;
    }
    if (targetIp == "") {
      showToast("Error", "Please fill target!", "failure");
      return;
    }
    if (targetPort == "") {
      showToast("Error", "Please fill target port!", "failure");
      return;
    }
    if (https == "") {
      showToast("Error", "Please select https!", "failure");
      return;
    }
    if (type == "") {
      showToast("Error", "Please select status!", "failure");
      return;
    }

    await axios
      .post(`${SERVER_URL}/port/create`, {
        title: title,
        listen_port: listenPort,
        target_port: targetPort,
        target_ip: targetIp,
        is_https: https,
        is_active: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "Item has been created.", "success");
          setTitle("");
          setListenPort("");
          setTargetIp("");
          setTargetPort("");
        } else {
          showToast("Error", "Something went wrong!", "failure");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.value);
  };

  const handleChangeHttpsOption = (e) => {
    setHttps(e.value);
  };

  return (
    <Container fluid className="p-6">
      <PageHeading heading="Create Port" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <Card.Body>
              <div>
                <Form>
                  <Row className="">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Title
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomInput
                        type="text"
                        placeholder="Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Listen Port
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomInput
                        type="text"
                        placeholder="Listen Port"
                        required
                        value={listenPort}
                        onChange={(e) => setListenPort(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Target
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomInput
                        type="text"
                        placeholder="Target"
                        required
                        value={targetIp}
                        onChange={(e) => setTargetIp(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Target Port
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomInput
                        type="text"
                        placeholder="Target Port"
                        required
                        value={targetPort}
                        onChange={(e) => setTargetPort(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Is Https
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={httpsOption}
                        placeHolder="Select https option"
                        onChange={handleChangeHttpsOption}
                        className="border rounded"
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

export default PortCreatePage;
