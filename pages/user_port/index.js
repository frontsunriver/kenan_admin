import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserMachineManagementPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const columns = [
    {
      name: "User Email",
      selector: (row) => row.email,
      grow: 1,
      sortable: true,
    },
    {
      name: "Port Title",
      selector: (row) => row.title,
      grow: 1,
      sortable: true,
    },
    {
      name: "Listen Port",
      selector: (row) => row.listen_port,
      grow: 1,
      sortable: true,
    },
    {
      name: "Target",
      selector: (row) => row.target,
      grow: 1,
      sortable: true,
    },
    {
      name: "Target Port",
      selector: (row) => row.target_port,
      grow: 1,
      sortable: true,
    },
    {
      name: "Valid",
      selector: (row) => {
        return row.is_valid == 1 ? (
          <Badge pill bg="primary" className="me-1">
            Enabled
          </Badge>
        ) : (
          <Badge pill bg="success" className="me-1">
            Disabled
          </Badge>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex items-center">
            <Button
              variant="primary"
              className="me-1"
              onClick={() => {
                handleGoDetail(row.id);
              }}
            >
              <i className={`nav-icon fe fe-edit`}></i>
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={() => {
                handleDelete(row.id);
              }}
            >
              <i className={`nav-icon fe fe-trash`}></i>
            </Button>
          </div>
        );
      },
      grow: 1,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        paddingTop: "5px",
        paddingBottom: "5px",
      },
    },
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.post(`${SERVER_URL}/userPort/getAll`).then((res) => {
      if (res.data.success) {
        setData(res.data.data);
      } else {
        console.log("error");
      }
    });
  };

  const handleDelete = (id) => {
    axios.post(`${SERVER_URL}/userPort/remove`, { id: id }).then((res) => {
      if (res.data.success) {
        getData();
        toast.success("Item has been deleted successfully");
      } else {
        console.log("error");
      }
    });
  };

  const handleCreate = () => {
    router.push("/user_port/create");
  };

  const handleGoDetail = (id) => {
    router.push(`/user_port/${id}`);
  };

  return (
    <Container fluid className="p-6">
      <ToastContainer />
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-between mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">User Port Management</h1>
            </div>
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container defaultActiveKey="design">
            <Card>
              <Card.Body className="p-3">
                <DataTable
                  columns={columns}
                  data={data}
                  customStyles={customStyles}
                  pagination
                />
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default UserMachineManagementPage;
