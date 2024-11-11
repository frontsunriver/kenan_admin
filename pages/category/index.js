import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryManagePage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const columns = [
    {
      name: "Image",
      selector: (row) => {
        return (
          <img src={`${row.image}`} style={{ width: "50px", height: "90px" }} />
        );
      },
      grow: 1,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },
    {
      name: "Content",
      selector: (row) => row.content,
      grow: 4,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => {
        return row.flag == 1 ? (
          <Badge pill bg="primary" className="me-1">
            Stream
          </Badge>
        ) : (
          <Badge pill bg="success" className="me-1">
            Event
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
      grow: 2,
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
    axios.post(`${SERVER_URL}/category/getAll`).then((res) => {
      if (res.data.success) {
        setData(res.data.data);
        console.log(res.data);
      } else {
        console.log("error");
      }
    });
  };

  const handleGoCreate = () => {
    router.push("/category/create");
  };

  const handleDelete = (id) => {
    axios.post(`${SERVER_URL}/category/remove`, { id: id }).then((res) => {
      if (res.data.success) {
        getData();
        toast.success("Category has been deleted");
      } else {
        console.log("error");
      }
    });
  };

  const handleGoDetail = (id) => {
    router.push(`/category/${id}`);
  };
  return (
    <Container fluid className="p-6">
      <ToastContainer />
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-between mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Category Management</h1>
              {/* <p className="mb-0 ">
                Documentation and examples for opt-in styling of tables (given
                their prevalent use in JavaScript plugins) with Bootstrap.
              </p> */}
            </div>
            <Button variant="primary" onClick={handleGoCreate}>
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

export default CategoryManagePage;
