import { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomSelect from "components/CustomSelect";
import SearchBox from "components/Search";
import { formatTimestamp, checkUrlExists } from "utils/utility";
import { useAuth } from "provider/AuthContext";
import "bootstrap-daterangepicker/daterangepicker.css";

const UserManagementPage = () => {
  const { userInfo } = useAuth();
  const { showToast } = useToast();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loginStart, setLoginStart] = useState("");
  const [loginEnd, setLoginEnd] = useState("");
  const [createdStart, setCreatedStart] = useState("");
  const [createdEnd, setCreatedEnd] = useState("");
  const router = useRouter();
  const validOption = [
    { label: "All", value: "" },
    { label: "Enabled", value: "1" },
    { label: "Disabled", value: "0" },
  ];

  const columns = [
    {
      name: "Email",
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
          <Badge
            pill
            bg="green-secondary"
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
          <div className="d-flex items-center">
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
            {checkUrlExists(userInfo, `${router.pathname}/group`) ? (
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
                  handleGoGroup(row.id);
                }}
                title="User Group"
              >
                <i className={`nav-icon fe fe-users`}></i>
              </div>
            ) : (
              <></>
            )}
            {checkUrlExists(userInfo, `${router.pathname}/resetPassword`) ? (
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
                  handleResetPassword(row.id);
                }}
                title="Reset Password"
              >
                <i className={`nav-icon fe fe-lock`}></i>
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
    getData(keyword, flag, loginStart, loginEnd, createdStart, createdEnd);
  }, []);

  const getData = (
    searchKeyword,
    valid,
    loginStart,
    loginEnd,
    createdStart,
    createdEnd
  ) => {
    axios
      .post(`${SERVER_URL}/user/getAll`, {
        keyword: searchKeyword,
        flag: valid,
        loginStart: loginStart,
        loginEnd: loginEnd,
        createdStart: createdStart,
        createdEnd: createdEnd,
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        } else {
          showToast("Error", "Something went wrong!", "failure");
        }
      });
  };

  const handleResetPassword = (id) => {
    axios.post(`${SERVER_URL}/user/resetPassword`, { id: id }).then((res) => {
      if (res.data.success) {
        showToast(
          "Success",
          "Password has been updated successfully with 123456!",
          "success"
        );
      } else {
        showToast("Error", "Something went wrong!", "failure");
      }
    });
  };

  const handleDelete = (id) => {
    axios.post(`${SERVER_URL}/user/remove`, { id: id }).then((res) => {
      if (res.data.success) {
        getData(keyword, flag, loginStart, loginEnd, createdStart, createdEnd);
        showToast("Success", "User has been deleted successfully!", "success");
      } else {
        showToast("Error", "Something went wrong!", "failure");
      }
    });
  };

  const handleCreate = () => {
    router.push("/user/create");
  };

  const handleGoGroup = (id) => {
    router.push(`/user/group/${id}`);
  };

  const handleGoDetail = (id) => {
    router.push(`/user/${id}`);
  };

  const handleSearch = () => {
    getData(keyword, flag, loginStart, loginEnd, createdStart, createdEnd);
  };

  const handleValidOption = (e) => {
    setFlag(e.value);
    getData(keyword, e.value, loginStart, loginEnd, createdStart, createdEnd);
  };

  const handleLastLoginedAt = (event, picker) => {
    picker.element.val(
      picker.startDate.format("MM/DD/YYYY") +
        " - " +
        picker.endDate.format("MM/DD/YYYY")
    );
    setLoginStart(picker.startDate.format("YYYY-MM-DD"));
    setLoginEnd(picker.endDate.format("YYYY-MM-DD"));
    getData(
      keyword,
      flag,
      picker.startDate.format("YYYY-MM-DD"),
      picker.endDate.format("YYYY-MM-DD"),
      createdStart,
      createdEnd
    );
  };

  const handleLastLoginedAtCancel = (event, picker) => {
    picker.element.val("");
    setLoginStart("");
    setLoginEnd("");
    getData(keyword, flag, "", "", createdStart, createdEnd);
  };

  const handleCreatedAt = (event, picker) => {
    picker.element.val(
      picker.startDate.format("MM/DD/YYYY") +
        " - " +
        picker.endDate.format("MM/DD/YYYY")
    );
    setCreatedStart(picker.startDate.format("YYYY-MM-DD"));
    setCreatedEnd(picker.endDate.format("YYYY-MM-DD"));
    getData(
      keyword,
      flag,
      loginStart,
      loginEnd,
      picker.startDate.format("YYYY-MM-DD"),
      picker.endDate.format("YYYY-MM-DD")
    );
  };

  const handleCreatedAtCancel = (event, picker) => {
    picker.element.val("");
    setCreatedStart("");
    setCreatedEnd("");
    getData(keyword, flag, loginStart, loginEnd, "", "");
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
                  <DateRangePicker
                    initialSettings={{
                      autoUpdateInput: false,
                      locale: { cancelLabel: "Clear" },
                    }}
                    onApply={handleLastLoginedAt}
                    onCancel={handleLastLoginedAtCancel}
                  >
                    <input
                      type="text"
                      className="border search-input rounded"
                      placeholder="Last Login At"
                    />
                  </DateRangePicker>

                  <DateRangePicker
                    initialSettings={{
                      autoUpdateInput: false,
                      locale: { cancelLabel: "Clear" },
                    }}
                    onApply={handleCreatedAt}
                    onCancel={handleCreatedAtCancel}
                  >
                    <input
                      type="text"
                      className="border search-input rounded"
                      placeholder="Created At"
                    />
                  </DateRangePicker>
                </div>
                {checkUrlExists(userInfo, `${router.pathname}/create`) ? (
                  <Button variant="green-secondary" onClick={handleCreate}>
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

export default UserManagementPage;
