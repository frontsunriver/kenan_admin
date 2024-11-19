import { Container } from "react-bootstrap";
import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import MD5 from "crypto-js/md5";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "provider/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const UserDetailPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState(null);
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userInfo && userInfo.id) {
      axios
        .post(`${SERVER_URL}/admin/findById`, { id: userInfo.id })
        .then((res) => {
          if (res.data.success) {
            setData(res.data.data[0]);
          }
        });
    }
  }, [userInfo]);

  const handleUpdate = async () => {
    if (oldPassword == "") {
      toast.error("Please fill old password!");
      return;
    }
    if (MD5(oldPassword) != data.password) {
      toast.error("Old password is not correct!");
      return;
    }
    if (newPassword == "") {
      toast.error("Please fill new password!");
      return;
    }
    if (confirmPassword == "") {
      toast.error("Please fill confirm password!");
      return;
    }
    if (confirmPassword != newPassword) {
      toast.error("new and old password shoud be matched!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/admin/updatePassword`, {
        id: userInfo.id,
        password: newPassword,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Password has been updated successfully");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          console.log("error");
        }
      });
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Update User Password" />
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
                      htmlFor="fullName"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Old Password
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Old Password"
                        id="oldPassword"
                        value={oldPassword}
                        required
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="fullName"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      New Password
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        id="newPassword"
                        value={newPassword}
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="fullName"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Confirm Password
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
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

export default UserDetailPage;
