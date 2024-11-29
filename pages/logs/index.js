import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import { FormSelect } from "widgets";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { formatTimestamp } from "utils/utility";

const AdminManagementPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const columns = [
    {
      name: "User Type",
      selector: (row) => {
        return row.user_type == 0 ? (
          <Badge
            pill
            bg="primary"
            className="me-1 p-2"
            style={{ fontSize: "12px" }}
          >
            User
          </Badge>
        ) : row.user_type == 1 ? (
          <Badge
            pill
            bg="green-secondary"
            className="me-1 p-2"
            style={{ fontSize: "12px" }}
          >
            Admin
          </Badge>
        ) : (
          <Badge
            pill
            bg="info"
            className="me-1 p-2"
            style={{ fontSize: "12px" }}
          >
            Machine
          </Badge>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "User Email",
      selector: (row) => row.email,
      grow: 1,
      sortable: true,
    },
    {
      name: "Object Title",
      selector: (row) => row.object_title,
      grow: 1,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      grow: 2,
      sortable: true,
    },
    {
      name: "Details",
      selector: (row) => row.details,
      grow: 3,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => {
        return formatTimestamp(row.time);
      },
      grow: 1,
      sortable: true,
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
    axios.post(`${SERVER_URL}/logs/getAll`).then((res) => {
      if (res.data.success) {
        setData(res.data.data);
      } else {
        console.log("error");
      }
    });
  };

  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-between mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">User Logs</h1>
              {/* <p className="mb-0 ">
                Documentation and examples for opt-in styling of tables (given
                their prevalent use in JavaScript plugins) with Bootstrap.
              </p> */}
            </div>
            {/* <Button variant="primary" onClick={handleGoCreate}>
              Create
            </Button> */}
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

export default AdminManagementPage;
