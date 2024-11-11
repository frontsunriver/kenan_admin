import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StreamManagementPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const columns = [
    {
      name: "Banner Image",
      selector: (row) => {
        return (
          <img
            src={`${row.banner}`}
            style={{ width: "100px", height: "50px" }}
          />
        );
      },
      grow: 1,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
      grow: 1,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
      grow: 1,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      grow: 1,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      grow: 1,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
      grow: 1,
      sortable: true,
    },
    {
      name: "view_cnt",
      selector: (row) => row.view_cnt,
      grow: 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.reg_date,
      grow: 1,
      sortable: true,
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
    axios.post(`${SERVER_URL}/stream/getAll`).then((res) => {
      if (res.data.success) {
        setData(res.data.data);
        console.log(res.data);
      } else {
        console.log("error");
      }
    });
  };

  const handleDelete = (id) => {
    axios.post(`${SERVER_URL}/stream/remove`, { id: id }).then((res) => {
      if (res.data.success) {
        getData();
        toast.success("Stream has been deleted successfully");
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
              <h1 className="mb-1 h2 fw-bold">Stream Management</h1>
              {/* <p className="mb-0 ">
                Documentation and examples for opt-in styling of tables (given
                their prevalent use in JavaScript plugins) with Bootstrap.
              </p> */}
            </div>
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

export default StreamManagementPage;
