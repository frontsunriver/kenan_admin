import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomSelect from "components/CustomSelect";
import SearchBox from "components/Search";
import { formatTimestamp } from "utils/utility";

const UserManagementPage = () => {
  const { showToast } = useToast();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState("");
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const validOption = [
    { label: "All", value: "" },
    { label: "Enabled", value: "1" },
    { label: "Disabled", value: "0" },
  ];

  const columns = [
    {
      name: "email",
      selector: (row) => row.email,
      grow: 1,
      sortable: true,
    },
    {
      name: "Login Count",
      selector: (row) => row.login_count,
      grow: 1,
      sortable: true,
    },
    {
      name: "Last Login At",
      selector: (row) => {
        return formatTimestamp(row.last_login_at);
      },
      grow: 1,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => {
        return formatTimestamp(row.created_at);
      },
      grow: 1,
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
              className="me-1 p-2 bg-success"
              onClick={() => {
                handleGoDetail(row.id);
              }}
              title="Edit"
            >
              <i className={`nav-icon fe fe-edit`}></i>
            </div>
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
              className="me-1 p-2 bg-info"
              onClick={() => {
                handleGoVm(row.id);
              }}
              title="VM Image"
            >
              <i className={`nav-icon fe fe-airplay`}></i>
            </div>
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
              className="me-1 p-2 bg-primary"
              onClick={() => {
                handleGoPort(row.id);
              }}
              title="Port"
            >
              <i className={`nav-icon fe fe-shield`}></i>
            </div>
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
              className="me-1 p-2 bg-warning"
              onClick={() => {
                handleGoConfiguration(row.id);
              }}
              title="Configuration"
            >
              <i className={`nav-icon fe fe-settings`}></i>
            </div>
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
    getData(keyword, flag);
  }, []);

  const getData = (searchKeyword, valid) => {
    axios
      .post(`${SERVER_URL}/user/getAll`, {
        keyword: searchKeyword,
        flag: valid,
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          console.log(res.data);
        } else {
          showToast("Error", "Something went wrong!", "failure");
        }
      });
  };

  const handleDelete = (id) => {
    axios.post(`${SERVER_URL}/user/remove`, { id: id }).then((res) => {
      if (res.data.success) {
        getData();
        showToast("Success", "User has been deleted successfully!", "success");
      } else {
        showToast("Error", "Something went wrong!", "failure");
      }
    });
  };

  const handleCreate = () => {
    router.push("/user/create");
  };

  const handleGoDetail = (id) => {
    router.push(`/user/${id}`);
  };

  const handleGoVm = (id) => {
    router.push(`/user/vmmachine/${id}`);
  };

  const handleGoPort = (id) => {
    router.push(`/user/port/${id}`);
  };

  const handleGoConfiguration = (id) => {
    router.push(`/user/user_config/${id}`);
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
              <h1 className="mb-1 h2 fw-bold">User Management</h1>
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
                <Button variant="primary" onClick={handleCreate}>
                  <i className="fe fe-plus me-2"></i> Create
                </Button>
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

export default UserManagementPage;
