import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import { FormSelect } from "widgets";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatTimestamp } from "utils/utility";

const AdminManagementPage = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const router = useRouter();

  const columns = [
    {
      name: "Object Type",
      selector: (row) => {
        return row.object_type == 0 ? (
          <Badge pill bg="primary" className="me-1">
            User
          </Badge>
        ) : row.object_type == 1 ? (
          <Badge pill bg="success" className="me-1">
            Admin
          </Badge>
        ) : (
          <Badge pill bg="info" className="me-1">
            Machine
          </Badge>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Object Id",
      selector: (row) => row.object_id,
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
    // {
    //   name: "Action",
    //   selector: (row) => {
    //     return (
    //       <div className="flex items-center">
    //         <Button
    //           variant="primary"
    //           className="me-1"
    //           onClick={() => {
    //             handleShowModal(row.id);
    //           }}
    //         >
    //           <i className={`nav-icon fe fe-edit`}></i>
    //         </Button>
    //         <Button
    //           variant="primary"
    //           className="me-1"
    //           onClick={() => {
    //             handleDelete(row.id);
    //           }}
    //         >
    //           <i className={`nav-icon fe fe-trash`}></i>
    //         </Button>
    //       </div>
    //     );
    //   },
    //   grow: 2,
    // },
  ];

  const handleShowModal = (id) => {
    router.push(`/logs/${id}`);
  };

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

  const handleGoCreate = () => {
    router.push("/logs/create");
  };

  const handleDelete = (id) => {
    axios.post(`${SERVER_URL}/logs/remove`, { id: id }).then((res) => {
      if (res.data.success) {
        getData();
        toast.success("Item has been deleted successfully");
      } else {
        console.log("error");
      }
    });
  };

  return (
    <Container fluid className="p-6">
      <ToastContainer />
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
