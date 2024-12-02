import { Container } from "react-bootstrap";
import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatTimestamp } from "utils/utility";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import DataTable from "react-data-table-component";

const UserSessionLogDetail = () => {
  const { showToast } = useToast();
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const columns = [
    {
      name: "Object Type",
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
            bg="success"
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
      name: "User Id",
      selector: (row) => row.user_id,
      grow: 1,
      sortable: true,
    },
    {
      name: "User Email",
      selector: (row) => row.user_email,
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
      grow: 1,
      sortable: true,
    },
    {
      name: "Details",
      selector: (row) => row.details,
      grow: 4,
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
        backgroundColor: "#fff",
        "&:nth-of-type(even)": {
          backgroundColor: "#f5f5f5",
        },
        "&:nth-of-type(odd)": {
          backgroundColor: "#fff",
        },
      },
    },
    headRow: {
      style: {
        backgroundColor: "#646889",
        color: "#fff",
      },
    },
  };

  useEffect(() => {
    if (id !== undefined) {
      axios
        .post(`${SERVER_URL}/logs/findByUserId`, { user_id: id, user_type: 0 })
        .then((res) => {
          if (res.data.success) {
            setData(res.data.data);
          } else {
            console.log("error");
          }
        });
    }
  }, [id]);

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="User logs" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <Card.Body>
              <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                pagination
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSessionLogDetail;
