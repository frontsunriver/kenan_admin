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
  const [https, setHttps] = useState(0);
  const [title, setTitle] = useState("");
  const [listenPort, setListenPort] = useState("");
  const [targetPort, setTargetPort] = useState("");
  const [targetIp, setTargetIp] = useState("");
  const [type, setType] = useState("");
  const [defaultOptionValue, setDefaultOptionValue] = useState(null);
  const [defaultHttpsOptionValue, setDefaultHttpsOptionValue] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const validOption = [
    { value: 1, label: "Enabled" },
    { value: 0, label: "Disabled" },
  ];

  const httpsOption = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/port/findById`, { id: id }).then((res) => {
        if (res.data.status == 200) {
          setTitle(res.data.data.data[0].title);
          setListenPort(res.data.data.data[0].listen_port);
          setTargetIp(res.data.data.data[0].target);
          setTargetPort(res.data.data.data[0].target_port);
          setDefaultOptionValue(
            getOptionByValue(res.data.data.data[0].is_active)
          );
          setDefaultHttpsOptionValue(
            getHttpsOptionByValue(res.data.data.data[0].is_https)
          );
          setType(res.data.data.data[0].is_valid);
          setHttps(res.data.data.data[0].is_https);
        } else {
          // toast.error(res.data.message);
        }
      });
    }
  }, [id]);

  const getOptionByValue = (value) => {
    return validOption.find((option) => option.value === value) || null;
  };

  const getHttpsOptionByValue = (value) => {
    return httpsOption.find((option) => option.value === value) || null;
  };

  const handleUpdate = async () => {
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
          showToast("Success", "Item has been updated.", "success");
          router.push("/port");
        } else {
          console.log("error");
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
      {/* Page Heading */}
      <PageHeading heading="Update Port" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
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
                        defaultValue={defaultHttpsOptionValue}
                        value={https}
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
