import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import { FormSelect } from "widgets";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import SearchBox from "components/Search";
import CustomSelect from "components/CustomSelect";

const AdminManagementPage = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState("");
  const [keyword, setKeyword] = useState("");

  const validOption = [
    { label: "All", value: "" },
    { label: "Enabled", value: "1" },
    { label: "Disabled", value: "0" },
  ];

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
      grow: 4,
      sortable: true,
    },
    {
      name: "Valid",
      selector: (row) => {
        return row.is_valid == 1 ? (
          <Badge pill bg="success" className="me-1">
            Enabled
          </Badge>
        ) : (
          <Badge pill bg="danger" className="me-1">
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
          <div className="d-flex items-center">
            {/* <div
              style={{
                background: "#e2e2e2",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "white",
              }}
              className="me-1 p-2 bg-success"
              onClick={() => {
                handleGoDetail(row.id);
              }}
              title="Edit"
            >
              <i className={`nav-icon fe fe-edit`}></i>
            </div> */}
            <div
              style={{
                background: "#e2e2e2",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "white",
              }}
              className="me-1 p-2 bg-danger"
              onClick={() => {
                handleDelete(row.id);
              }}
              title="Delete"
            >
              <i className={`nav-icon fe fe-trash`}></i>
            </div>
          </div>
        );
      },
      grow: 1,
    },
  ];

  const handleShowModal = (id) => {
    router.push(`/adminuser/${id}`);
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
    getData(keyword, flag);
  }, []);

  const getData = (searchKeyword, valid) => {
    axios
      .post(`${SERVER_URL}/admin/getAll`, {
        keyword: searchKeyword,
        flag: valid,
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        } else {
          showToast("Error", "Something went wrong!", "failure");
        }
      });
  };

  const handleGoCreate = () => {
    router.push("/category/create");
  };

  const handleDelete = (id) => {
    axios.post(`${SERVER_URL}/admin/remove`, { id: id }).then((res) => {
      if (res.data.success) {
        getData(keyword, flag);
        showToast("Success", "Item has been deleted successfully.", "success");
      } else {
        showToast("Error", "Something went wrong!", "failure");
      }
    });
  };

  const handleSearch = () => {
    getData(keyword, flag);
  };

  const handleValidOption = (e) => {
    setFlag(e.value);
    getData(keyword, e.value);
  };

  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-between mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Admin Management</h1>
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
              <Card.Body className="d-flex justify-content-between align-items-center ">
                <div className="d-flex p-3 gap-2">
                  <SearchBox
                    onChange={setKeyword}
                    onSearch={handleSearch}
                    placeholder="Search..."
                  />
                  <CustomSelect
                    options={validOption}
                    placeHolder="Select valid option"
                    onChange={handleValidOption}
                    className="border rounded"
                    // defaultValue={defaultSelected}
                  />
                </div>
                {/* <Button variant="primary" onClick={handleCreate}>
                  <i className="fe fe-plus me-2"></i> Create
                </Button> */}
              </Card.Body>
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
