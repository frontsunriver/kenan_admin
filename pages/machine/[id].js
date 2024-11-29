import { Container } from "react-bootstrap";
import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomInput from "components/CustomInput";
import CustomSelect from "components/CustomSelect";

const UserDetailPage = () => {
  const { showToast } = useToast();
  const [machineId, setMachineId] = useState("");
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [defaultUserOption, setDefaultUserOption] = useState(null);
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
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      axios
        .post(`${SERVER_URL}/usermachine/findById`, { id: id })
        .then((res) => {
          if (res.data.success) {
            setMachineId(res.data.data[0].machine_id);
            setUserId(res.data.data[0].user_id);
            setType(res.data.data[0].is_valid);
            setDefaultUserOption(getUserOptionValue(res.data.data[0].user_id));
            setDefaultStatus(getOptionByValue(res.data.data[0].is_valid));
          } else {
            showToast("Error", "Something went wrong", "failure");
          }
        });
    }
  }, [id, userOptions]);

  const handleUpdate = async () => {
    if (machineId == "") {
      showToast("Error", "Please fill machine id!", "failure");
      return;
    }

    await axios
      .post(`${SERVER_URL}/usermachine/update`, {
        id: id,
        machine_id: machineId,
        user_id: userId,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "Item has been updated successfully", "success");
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

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Update User Machine" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div>
                <Form>
                  {/* row */}

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
                    <label
                      htmlFor="fullName"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Machine ID
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="text"
                        placeholder="Machine ID"
                        required
                        onChange={(e) => setMachineId(e.target.value)}
                        value={machineId}
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

export default UserDetailPage;
