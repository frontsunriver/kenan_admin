import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useAuth } from "provider/AuthContext";
import { useToast } from "provider/ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cpu, DoorOpen, PeopleFill, PersonWorkspace, Stack } from "react-bootstrap-icons";

const UserManagementPage = () => {
  const [user, setUser] = useState([]);
  const [machine, setMachine] = useState([]);
  const [vmImages, setVmImages] = useState([]);
  const [loginCount, setLoginCount] = useState([]);
  const { userInfo } = useAuth();
  const { showToast } = useToast();
  const [roleArray, setRoleArray] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    let userData = null;
    const cookie = cookies.find((row) =>
      row.startsWith("X-Local-Storage-Data=")
    );
    if (cookie && cookie != "") {
      userData = cookie.split("=")[1];
    }
    if (userData != "''" && userData != null) {
      const userInfo = JSON.parse(userData);
      setRoleArray(userInfo["roles"]);
    }
  }, []);

  const getLoginCount = () => {
    axios.post(`${SERVER_URL}/logs/getLoginCount`).then((res) => {
      if (res.data.success) {
        setLoginCount(res.data.data.length);
      } else {
        console.log("error");
      }
    });
  };

  const getMachine = () => {
    axios.post(`${SERVER_URL}/usermachine/getAll`).then((res) => {
      if (res.data.success) {
        setMachine(res.data.data);
      } else {
        console.log("error");
      }
    });
  };

  const getVmImage = () => {
    axios.post(`${SERVER_URL}/vmimage/getAll`).then((res) => {
      if (res.data.success) {
        setVmImages(res.data.data);
      } else {
        console.log("error");
      }
    });
  };

  const getUser = () => {
    axios.post(`${SERVER_URL}/user/getAll`).then((res) => {
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    getUser();
    getMachine();
    getVmImage();
    getLoginCount();
  }, []);

  return (
    <Container fluid className="p-6">
      <ToastContainer />
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-between mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Dashboard</h1>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
              gap: "20px",
            }}
          >
            <Card style={{ background: "#0070ff" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>{user.length}</div>
                  <div style={{ color: "#e3e3e3" }}>
                    <PeopleFill size={96} />
                  </div>
                </Card.Title>
                <Card.Text style={{ color: "#fff", fontSize: "25px" }}>
                  Users
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (roleArray.find((item) => item.url === "/user")) {
                      router.push("/user");
                    } else {
                      showToast(
                        "Error",
                        "You do not have permission",
                        "failure"
                      );
                    }
                  }}
                >
                  More Info
                </div>
              </Card.Footer>
            </Card>
            <Card style={{ background: "#3e4684" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>{machine.length}</div>
                  <div style={{ color: "#e3e3e3" }}>
                    <Cpu size={96} />
                  </div>
                </Card.Title>
                <Card.Text style={{ color: "#fff", fontSize: "25px" }}>
                  User Machines
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (roleArray.find((item) => item.url === "/machine")) {
                      router.push("/machine");
                    } else {
                      showToast(
                        "Error",
                        "You do not have permission",
                        "failure"
                      );
                    }
                  }}
                >
                  More Info
                </div>
              </Card.Footer>
            </Card>
            <Card style={{ background: "#cc6600" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>{vmImages.length}</div>
                  <div style={{ color: "#e3e3e3" }}>
                    <Stack size={96} />
                  </div>
                </Card.Title>
                <Card.Text style={{ color: "#fff", fontSize: "25px" }}>
                  VM Images
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (roleArray.find((item) => item.url === "/vm_images")) {
                      router.push("/vm_images");
                    } else {
                      showToast(
                        "Error",
                        "You do not have permission",
                        "failure"
                      );
                    }
                  }}
                >
                  More Info
                </div>
              </Card.Footer>
            </Card>
            <Card style={{ background: "#e60000" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>{loginCount}</div>
                  <div style={{ color: "#e3e3e3" }}>
                    <DoorOpen size={96} />
                  </div>
                </Card.Title>
                <Card.Text style={{ color: "#fff", fontSize: "25px" }}>
                  Login Count
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (roleArray.find((item) => item.url === "/logs")) {
                      router.push("/logs");
                    } else {
                      showToast(
                        "Error",
                        "You do not have permission",
                        "failure"
                      );
                    }
                  }}
                >
                  More Info
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagementPage;
