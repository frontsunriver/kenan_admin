import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { FormSelect } from "widgets";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PortCreatePage = () => {
  const router = useRouter();
  const [https, setHttps] = useState(0);
  const [title, setTitle] = useState("");
  const [listenPort, setListenPort] = useState("");
  const [targetIp, setTargetIp] = useState("");
  const [targetPort, setTargetPort] = useState("");
  const [type, setType] = useState("");

  const countryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  const httpsOption = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ];

  const handleCreate = async () => {
    if (title == "") {
      toast.error("Please fill Title!");
      return;
    }
    if (listenPort == "") {
      toast.error("Please select listen port!");
      return;
    }
    if (targetIp == "") {
      toast.error("Please select target ip!");
      return;
    }
    if (targetPort == "") {
      toast.error("Please select target port!");
      return;
    }
    if (type == "") {
      toast.error("Please select type!");
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
          toast.success("Item has been created.");
          router.push("/port");
        } else {
          console.log("error");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleChangeHttpsOption = (e) => {
    setHttps(e.target.value);
  };

  return (
    <Container fluid className="p-6">
      <PageHeading heading="Create Port" />
      <ToastContainer />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <Card.Body>
              <div>
                <Form>
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
                        id="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="Title"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Listen Port
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Listen Port"
                        id="listen_port"
                        required
                        onChange={(e) => setListenPort(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="Title"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Target
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Target"
                        id="target"
                        required
                        onChange={(e) => setTargetIp(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="Title"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Target Port
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Target Port"
                        id="targetPort"
                        required
                        onChange={(e) => setTargetPort(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Is Https
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <Form.Control
                        as={FormSelect}
                        placeholder="Select Type"
                        id="country"
                        options={httpsOption}
                        onChange={(e) => {
                          handleChangeHttpsOption(e);
                        }}
                      />
                    </Col>
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

export default PortCreatePage;
