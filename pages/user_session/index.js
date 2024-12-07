import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import { useAuth } from "provider/AuthContext";
import { formatTimestamp, checkUrlExists, transferDataSpeed } from "utils/utility";
import SearchBox from "components/Search";
import CustomSelect from "components/CustomSelect";

const UserMachineManagementPage = () => {
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
      name: "User Email",
      selector: (row) => row.email,
      grow: 2,
      sortable: true,
    },
    {
      name: "Machine ID",
      selector: (row) => row.machine_id,
      sortable: true,
      grow: 2,
    },
    {
      name: "Session ID",
      selector: (row) => row.session_id,
      grow: 5,
      sortable: true,
    },
    {
      name: "IP",
      selector: (row) => row.ip,
      sortable: true,
      grow: 2,
    },
    {
      name: "Created At",
      selector: (row) => {
        return formatTimestamp(row.created_at);
      },
      grow: 2,
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => {
        return formatTimestamp(row.updated_at);
      },
      grow: 2,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return row.status == 1 ? (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#6cff00",
            }}
          ></div>
        ) : (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#e2e2e2",
            }}
          ></div>
        );
      },
      grow: 1,
    },
    {
      name: "Speed",
      selector: (row) => {
        const targetValue = transferDataSpeed(row.speed);
        return <div>{targetValue}</div>;
      },
      grow: 1,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="d-flex align-items-center">
            {checkUrlExists(userInfo, `${router.pathname}/logs`) ? (
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
                  handleGoDetail(row.user_id);
                }}
                title="Edit"
              >
                <i className={`nav-icon fe fe-book-open`}></i>
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
    getData(keyword, flag);

    const interval = setInterval(() => {
      getData(keyword, flag);
    }, 15000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const getData = (searchKeyword, valid) => {
    axios
      .post(`${SERVER_URL}/userSession/getAll`, {
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

  const handleCreate = () => {
    router.push("/machine/create");
  };

  const handleGoDetail = (id) => {
    router.push(`/user_session/${id}`);
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
              <h1 className="mb-1 h2 fw-bold">User Sessions Status</h1>
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

export default UserMachineManagementPage;
