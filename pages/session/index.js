import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { FormSelect } from "widgets";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import CustomInput from "components/CustomInput";
import { useToast } from "provider/ToastContext";

const ExpireSessionPage = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [sessionTime, setSessionTime] = useState("");
  const [agentTimeout, setAgentTimeout] = useState("");

  useEffect(() => {
    axios.post(`${SERVER_URL}/session/get`).then((res) => {
      if (res.data.success) {
        if (res.data.data.length > 0) {
          setSessionTime(res.data.data[0].session_expircy_time);
          setAgentTimeout(res.data.data[0].agent_timeout);
        }
      } else {
        console.log("error");
      }
    });
  }, []);

  const handleCreate = async () => {
    if (sessionTime == "") {
      showToast("Error", "Please fill machine id!", "failure");
      return;
    }

    await axios
      .post(`${SERVER_URL}/session/update`, {
        session_expircy_time: sessionTime,
        agent_timeout : agentTimeout
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "Session time is updated", "success");
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
  };

  return (
    <Container fluid className="p-6">
      <PageHeading heading="Configuration" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <Card.Body>
              <div>
                <Form>
                  <Row className="mb-3">
                    <label
                      htmlFor="machine"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Session Time(seconds)
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="text"
                        placeholder="Session Time"
                        required
                        onChange={(e) => setSessionTime(e.target.value)}
                        value={sessionTime}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="machine"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Agent Timeout(seconds)
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="text"
                        placeholder="Agent Timeout"
                        required
                        onChange={(e) => setAgentTimeout(e.target.value)}
                        value={agentTimeout}
                      />
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <Col
                      md={{ offset: 4, span: 8 }}
                      xs={8}
                      className="mt-4 d-flex justify-content-end gap-2"
                    >
                      <Button variant="green-secondary" onClick={handleCreate}>
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

export default ExpireSessionPage;
