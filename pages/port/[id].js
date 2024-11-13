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

const PortDetailPage = () => {
  const [https, setHttps] = useState(0);
  const [title, setTitle] = useState("");
  const [listenPort, setListenPort] = useState("");
  const [targetPort, setTargetPort] = useState("");
  const [targetIp, setTargetIp] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const countryOptions = [
    { value: "1", label: "Enabled" },
    { value: "0", label: "Disabled" },
  ];

  const httpsOption = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ];

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/port/findById`, { id: id }).then((res) => {
        console.log(res.data);
        if (res.data.status == 200) {
          setTitle(res.data.data.data[0].title);
          setListenPort(res.data.data.data[0].listen_port);
          setTargetIp(res.data.data.data[0].target);
          setTargetPort(res.data.data.data[0].target_port);
          setType(res.data.data.data[0].is_valid);
          setHttps(res.data.data.data[0].is_https);
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
    if (listenPort == "") {
      toast.error("Please fill listen port!");
      return;
    }
    if (targetIp == "") {
      toast.error("Please fill target!");
      return;
    }
    if (targetPort == "") {
      toast.error("Please fill target port!");
      return;
    }
    if (https == "") {
      toast.error("Please select https type!");
      return;
    }
    if (type == "") {
      toast.error("Please select status!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/port/update`, {
        id: id,
        title: title,
        listen_port: listenPort,
        target: targetIp,
        target_port: targetPort,
        is_https: https,
        is_active: type,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Item has been updated successfully");
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
      {/* Page Heading */}
      <PageHeading heading="Update Port" />
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
                        value={title}
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
                        id="Listen_Port"
                        value={listenPort}
                        required
                        onChange={(e) => setListenPort(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="target_ip"
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
                        id="target_ip"
                        value={targetIp}
                        required
                        onChange={(e) => setTargetIp(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="target_port"
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
                        id="target_port"
                        value={targetPort}
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
                        placeholder="Select Https Type"
                        id="httpType"
                        options={httpsOption}
                        onChange={(e) => {
                          handleChangeHttpsOption(e);
                        }}
                      />
                    </Col>
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

export default PortDetailPage;
