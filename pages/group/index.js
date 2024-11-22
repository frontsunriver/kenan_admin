import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import CustomSelect from "components/CustomSelect";
import SearchBox from "components/Search";
import { useToast } from "provider/ToastContext";
import { useAuth } from "provider/AuthContext";
import { formatTimestamp, checkUrlExists } from "utils/utility";

const GroupManagementPage = () => {
  const { userInfo } = useAuth();
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 1,
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
      name: "Updated At",
      selector: (row) => {
        return formatTimestamp(row.updated_at);
      },
      grow: 1,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return row.is_valid == 1 ? (
          <Badge
            pill
            bg="success"
            className="me-1 p-2"
            style={{ fontSize: "12px" }}
          >
            Enabled
          </Badge>
        ) : (
          <Badge
            pill
            bg="danger"
            className="me-1 p-2"
            style={{ fontSize: "12px" }}
          >
            Disabled
          </Badge>
        );
      },
      grow: 1,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="d-flex align-items-center">
            {checkUrlExists(userInfo, `${router.pathname}/[id]`) ? (
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
            ) : (
              <></>
            )}
            {checkUrlExists(userInfo, `${router.pathname}/delete`) ? (
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
            ) : (
              <></>
            )}
            {checkUrlExists(userInfo, `${router.pathname}/vm`) ? (
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
            ) : (
              <></>
            )}
            {checkUrlExists(userInfo, `${router.pathname}/port`) ? (
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
            ) : (
              <></>
            )}
            {checkUrlExists(userInfo, `${router.pathname}/config`) ? (
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
            ) : (
              <></>
            )}
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
      .post(`${SERVER_URL}/group/getAll`, {
        keyword: searchKeyword,
        flag: valid,
      })
      .then((res) => {
        if (res.data.status == 200) {
          setData(res.data.data.data);
        } else {
          console.log("error");
        }
      });
  };

  const handleDelete = (id) => {
    axios.post(`${SERVER_URL}/group/remove`, { id: id }).then((res) => {
      if (res.data.success) {
        getData(keyword, flag);
        showToast("Success", "Item has been deleted successfully", "success");
      } else {
        console.log("error");
      }
    });
  };

  const handleCreate = () => {
    router.push("/group/create");
  };

  const handleGoDetail = (id) => {
    router.push(`/group/${id}`);
  };

  const handleGoVm = (id) => {
    router.push(`/group/vmmachine/${id}`);
  };

  const handleGoPort = (id) => {
    router.push(`/group/port/${id}`);
  };

  const handleGoConfiguration = (id) => {
    router.push(`/group/config/${id}`);
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
              <h1 className="mb-1 h2 fw-bold">Group Management</h1>
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
                    placeHolder="Select status option"
                    onChange={handleValidOption}
                    className="border rounded"
                    // defaultValue={defaultSelected}
                  />
                </div>
                {checkUrlExists(userInfo, `${router.pathname}/create`) ? (
                  <Button variant="primary" onClick={handleCreate}>
                    <i className="fe fe-plus me-2"></i> Create
                  </Button>
                ) : (
                  <></>
                )}
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

export default GroupManagementPage;
