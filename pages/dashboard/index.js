import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useAuth } from "provider/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagementPage = () => {
  const [user, setUser] = useState([]);
  const [machine, setMachine] = useState([]);
  const [vmImages, setVmImages] = useState([]);
  const [loginCount, setLoginCount] = useState([]);
  const { userInfo } = useAuth();
  const router = useRouter();

  const getUserInfo = () => {
    axios
      .post(`${SERVER_URL}/admin/findById`, { id: userInfo.id })
      .then((res) => {
        if (res.data.success) {
          setLoginCount(res.data.data);
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
    if (userInfo != null) {
      getUserInfo();
    }
  }, [userInfo]);

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
            <Card style={{ background: "#0070ff", height: "200px" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {user.length}
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
                  onClick={() => router.push("/user")}
                >
                  More Info
                </div>
              </Card.Footer>
            </Card>
            <Card style={{ background: "#00e600", height: "200px" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {machine.length}
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
                  onClick={() => router.push("/machine")}
                >
                  More Info
                </div>
              </Card.Footer>
            </Card>
            <Card style={{ background: "#cc6600", height: "200px" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {vmImages.length}
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
                  onClick={() => router.push("/vm_images")}
                >
                  More Info
                </div>
              </Card.Footer>
            </Card>
            <Card style={{ background: "#e60000", height: "200px" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {loginCount.length > 0 && loginCount[0]
                    ? loginCount[0].login_count
                    : 0}
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
                  onClick={() => router.push("/adminuser")}
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
