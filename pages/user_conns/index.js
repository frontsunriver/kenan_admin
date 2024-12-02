import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import { useAuth } from "provider/AuthContext";
import { formatTimestamp, transferDataSpeed } from "utils/utility";
import SearchBox from "components/Search";
import CustomSelect from "components/CustomSelect";

const UserConnectionManagement = () => {
  const { userInfo } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchPortName, setSearchPortName] = useState("");
  const [searchListenPort, setSearchListenPort] = useState("");
  const [searchTarget, setSearchTarget] = useState("");
  const [searchTargetPort, setSearchTargetPort] = useState("");

  const validOption = [
    { label: "All", value: "" },
    { label: "Connected", value: "1" },
    { label: "Unstable", value: "2" },
    { label: "Disabled", value: "0" },
  ];

  const columns = [
    {
      name: "User Email",
      selector: (row) => row.email,
      grow: 1,
      sortable: true,
    },
    {
      name: "Machine ID",
      selector: (row) => row.machine_id,
      sortable: true,
      grow: 1,
    },
    {
      name: "Port Name",
      selector: (row) => row.title,
      grow: 1,
      sortable: true,
    },
    {
      name: "Listen Port",
      selector: (row) => row.listen_port,
      grow: 1,
      sortable: true,
    },
    {
      name: "Target",
      selector: (row) => row.target,
      grow: 1,
      sortable: true,
    },
    {
      name: "Target Port",
      selector: (row) => row.target_port,
      grow: 1,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return row.status_value == 1 ? (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#6cff00",
            }}
          ></div>
        ) : row.status_value == 2 ? (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#e38a2c",
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
        return <div>{row.connection_status == 1 ? targetValue : `0 B/s`}</div>;
      },
      grow: 1,
    },
    {
      name: "Updated At",
      selector: (row) => {
        return formatTimestamp(row.updated_at);
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
    getData(
      keyword,
      searchPortName,
      searchListenPort,
      searchTarget,
      searchTargetPort,
      flag
    );

    const interval = setInterval(() => {
      getData(
        keyword,
        searchPortName,
        searchListenPort,
        searchTarget,
        searchTargetPort,
        flag
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getData = (
    searchKeyword,
    portName,
    listenPort,
    target,
    targetPort,
    valid
  ) => {
    axios
      .post(`${SERVER_URL}/userConnection/getAll`, {
        keyword: searchKeyword,
        portName: portName,
        listenPort: listenPort,
        target: target,
        targetPort: targetPort,
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

  const handleSearch = () => {
    getData(
      keyword,
      searchPortName,
      searchListenPort,
      searchTarget,
      searchTargetPort,
      flag
    );
  };

  const handleSearchPortName = () => {
    getData(
      keyword,
      searchPortName,
      searchListenPort,
      searchTarget,
      searchTargetPort,
      flag
    );
  };

  const handleSearchListenPort = () => {
    getData(
      keyword,
      searchPortName,
      searchListenPort,
      searchTarget,
      searchTargetPort,
      flag
    );
  };

  const handleSearchTarget = () => {
    getData(
      keyword,
      searchPortName,
      searchListenPort,
      searchTarget,
      searchTargetPort,
      flag
    );
  };

  const handleSearchTargetPort = () => {
    getData(
      keyword,
      searchPortName,
      searchListenPort,
      searchTarget,
      searchTargetPort,
      flag
    );
  };

  const handleValidOption = (e) => {
    console.log(e.value);
    setFlag(e.value);
    getData(
      keyword,
      searchPortName,
      searchListenPort,
      searchTarget,
      searchTargetPort,
      e.value
    );
  };

  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-between mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">User Connection Status</h1>
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
                    placeholder="User Email, machine id"
                    width={200}
                  />
                  <SearchBox
                    onChange={setSearchPortName}
                    onSearch={handleSearchPortName}
                    placeholder="Port Name..."
                    width={200}
                  />
                  <SearchBox
                    onChange={setSearchListenPort}
                    onSearch={handleSearchListenPort}
                    placeholder="Listen Port..."
                    width={200}
                  />
                  <SearchBox
                    onChange={setSearchTarget}
                    onSearch={handleSearchTarget}
                    placeholder="Target..."
                    width={200}
                  />
                  <SearchBox
                    onChange={setSearchTargetPort}
                    onSearch={handleSearchTargetPort}
                    placeholder="Target Port..."
                    width={200}
                  />
                  <CustomSelect
                    options={validOption}
                    placeHolder="Select valid option"
                    onChange={handleValidOption}
                    className="border rounded"
                    // defaultValue={defaultSelected}
                  />
                </div>
                {/* {checkUrlExists(userInfo, `${router.pathname}/create`) ? (
                  <Button variant="green-secondary" onClick={handleCreate}>
                    <i className="fe fe-plus me-2"></i> Create
                  </Button>
                ) : (
                  <></>
                )} */}
                <div
                  style={{
                    background: "#3e4684",
                    color: "#fff",
                    padding: "0.8rem",
                    borderRadius: "5px",
                    width: "200px",
                  }}
                >
                  <div className="d-flex align-items-center">
                    {" "}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#6cff00",
                      }}
                    ></div>{" "}
                    <span>&nbsp; Connected</span>
                  </div>
                  <div className="d-flex align-items-center">
                    {" "}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#e38a2c",
                      }}
                    ></div>{" "}
                    <span>&nbsp; Unstable</span>
                  </div>
                  <div className="d-flex align-items-center">
                    {" "}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#e2e2e2",
                      }}
                    ></div>{" "}
                    <span>&nbsp; Disconnected</span>
                  </div>
                </div>
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

export default UserConnectionManagement;
