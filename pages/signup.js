// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name == "") {
      toast.error("Please fill your name");
      return;
    }
    if (email == "") {
      toast.error("Please fill your email");
      return;
    }
    if (password == "") {
      toast.error("Please fill your password");
      return;
    }
    if (confirm == "") {
      toast.error("Please fill your confirm password");
      return;
    }
    if (password != confirm) {
      toast.error("Password does not match");
      return;
    }
    axios
      .post(`${SERVER_URL}/admin/signup`, {
        email: email,
        password: password,
        name: name,
      })
      .then((res) => {
        if (res.data.success) {
          setName("");
          setEmail("");
          setPassword("");
          setConfirm("");
          toast.warning("Please wait once account is allowed");
        }
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
                  <Image
                    src="/images/logo.png"
                    className="mb-2"
                    alt=""
                    style={{ width: "150px" }}
                  />
                </Link>
              </div>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            <Form>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="User Name"
                  required=""
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter address here"
                  required=""
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm-password"
                  placeholder="**************"
                  required=""
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />
              </Form.Group>

              {/* Checkbox */}
              <div className="mb-3">
                <Form.Check type="checkbox" id="check-api-checkbox">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>
                    I agree to the <Link href="#"> Terms of Service </Link> and{" "}
                    <Link href="#"> Privacy Policy.</Link>
                  </Form.Check.Label>
                </Form.Check>
              </div>

              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" onClick={handleSubmit}>
                    Create Account
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/signin" className="fs-5">
                      Already member? Login{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
