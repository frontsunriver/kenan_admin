import { Container } from "react-bootstrap";
import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomSelect from "components/CustomSelect";

const UserPortDetail = () => {
  const { showToast } = useToast();
  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [portOptions, setPortOptions] = useState([]);
  const [defaultUserOption, setDefaultUserOption] = useState(null);
  const [defaultPortOption, setDefaultPortOption] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const validOption = [
    { value: 1, label: "Enabled" },
    { value: 0, label: "Disabled" },
  ];

  const getOptionByValue = (value) => {
    return validOption.find((option) => option.value === value) || null;
  };

  const getUserOptionValue = (value) => {
    return userOptions.find((option) => option.value === value) || null;
  };

  const getPortOptionValue = (value) => {
    return portOptions.find((option) => option.value === value) || null;
  };

  useEffect(() => {
    axios.post(`${SERVER_URL}/user/getAll`).then((res) => {
      if (res.data.success) {
        let users = [];
        res.data.data.map((user) => {
          users.push({ value: user.id, label: user.email });
        });
        setUserOptions(users);
      } else {
        console.log("error");
      }
    });
    axios.post(`${SERVER_URL}/group/getAll`).then((res) => {
      if (res.data.status == 200) {
        let ports = [];
        res.data.data.data.map((group) => {
          ports.push({ value: group.id, label: group.name });
        });
        setPortOptions(ports);
      } else {
        console.log("error");
      }
    });
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/groupUser/findById`, { id: id }).then((res) => {
        if (res.data.status == 200) {
          setGroupId(res.data.data.data[0].group_id);
          setUserId(res.data.data.data[0].user_id);
          setType(res.data.data.data[0].is_valid);
          setDefaultPortOption(
            getPortOptionValue(res.data.data.data[0].group_id)
          );
          setDefaultUserOption(
            getUserOptionValue(res.data.data.data[0].user_id)
          );
          setDefaultStatus(getOptionByValue(res.data.data.data[0].is_valid));
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
    }
  }, [id, portOptions, userOptions]);

  const handleUpdate = async () => {
    await axios
      .post(`${SERVER_URL}/groupUser/update`, {
        id: id,
        group_id: groupId,
        user_id: userId,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "Item has been updated successfully", "success");
          router.push("/group_user");
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.value);
  };

  const handleUserChange = (e) => {
    setUserId(e.value);
  };

  const handlePortChange = (e) => {
    setGroupId(e.value);
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Update User Port" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div>
                <Form>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      User
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={userOptions}
                        placeHolder="Select user option"
                        onChange={handleUserChange}
                        className="border rounded"
                        defaultValue={defaultUserOption}
                        value={userId}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Group
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={portOptions}
                        placeHolder="Select group option"
                        onChange={handlePortChange}
                        className="border rounded"
                        defaultValue={defaultPortOption}
                        value={groupId}
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
                        defaultValue={defaultStatus}
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

export default UserPortDetail;
