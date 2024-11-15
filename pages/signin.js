// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { SERVER_URL } from "config/constant";
import { useAuth } from "provider/AuthContext";
import { useToast } from "provider/ToastContext";
import axios from "axios";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${SERVER_URL}/admin/signin`, { email: email, password: password })
      .then((res) => {
        if (res.data.success) {
          login(res.data.users[0]);
          router.push("/");
          showToast("Success", "Login successfully", "success");
        } else {
          showToast("Error", "User account or password is wrong.", "failure");
        }
      })
      .catch((err) => {
        console.log(err);
        showToast("Error", err, "failure");
      });
  };
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <ToastContainer />
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <div className="d-flex justify-content-center">
                <Link href="/">
                  <img
                    src="/images/logo.png"
                    className="mb-2"
                    alt=""
                    width={150}
                  />
                </Link>
              </div>

              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            <Form>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username or email</Form.Label>
                <Form.Control
                  type="email"
                  name="username"
                  placeholder="Enter address here"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="**************"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {/* Checkbox */}
              <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberme">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div>
              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" onClick={handleSubmit}>
                    Sign In
                  </Button>
                </div>
                {/* <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/signup" className="fs-5">
                      Create An Account{" "}
                    </Link>
                  </div>
                </div> */}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
