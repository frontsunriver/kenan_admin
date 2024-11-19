import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";

let selectedRecord = [];
const UserManagementPage = () => {
  const [data, setData] = useState([]);
  const { showToast } = useToast();
  const router = useRouter();
  const { id } = router.query;

  const columns = [
    { name: "Title", selector: (row) => row.title, grow: 1, sortable: true },
    {
      name: "Listen Port",
      selector: (row) => row.listen_port,
      grow: 1,
      sortable: true,
    },
    {
      name: "Target",
      selector: (row) => row.target,
      grow: 3,
      sortable: true,
    },
    {
      name: "Target Port",
      selector: (row) => row.target_port,
      grow: 2,
      sortable: true,
    },
    {
      name: "Https",
      selector: (row) => {
        return row.is_https == 1 ? (
          <Badge pill bg="success" className="me-1">
            Yes
          </Badge>
        ) : (
          <Badge pill bg="danger" className="me-1">
            No
          </Badge>
        );
      },
      grow: 1,
      sortable: true,
    },
  ];

  const rowSelectCriteria = (row) => row.is_selected;

  const customStyles = {
    rows: {
      style: {
        paddingTop: "5px",
        paddingBottom: "5px",
      },
    },
  };

  const getPortList = async () => {
    selectedRecord = [];
    try {
      const response = await axios.post(`${SERVER_URL}/port/getAll`);
      if (response.data.status == 200) {
        setData(response.data.data.data);
        const res = await axios.post(`${SERVER_URL}/userPort/findByUserId`, {
          user_id: id,
        });
        if (res.data.status == 200) {
          const userPortIds = res.data.data.data.map(
            (item) => item.port_map_id
          );
          const updatedPortList = response.data.data.data.map((item) => ({
            ...item,
            is_selected: userPortIds.includes(item.id),
          }));
          selectedRecord = updatedPortList.filter((item) => item.is_selected);
          setData(updatedPortList);
        } else {
          showToast("Error", "Error fetching user port list", "failure");
        }
      } else {
        showToast("Error", "Error fetching user port list", "failure");
      }
    } catch (error) {
      showToast("Error", "An unexpected error occurred", "failure");
    }
  };

  useEffect(() => {
    if (id) {
      getPortList();
    }
  }, []);

  const handleChange = (e) => {
    selectedRecord = [];
    selectedRecord = e.selectedRows;
  };

  const handleUpdate = async () => {
    await axios
      .post(`${SERVER_URL}/userPort/batchUpdate`, {
        data: selectedRecord,
        id: id,
      })
      .then((res) => {
        if (res.data.success) {
          getPortList();
          showToast("Success", "User Port updated successfully", "success");
        } else {
          showToast("Error", "An unexpected error occurred", "failure");
        }
      });
  };

  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <h1 className="mb-1 h2 fw-bold">User Port Management</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Tab.Container defaultActiveKey="design">
            <Card>
              <Card.Body className="d-flex justify-content-end gap-2">
                <Button variant="primary" onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="danger" onClick={() => router.back()}>
                  Back
                </Button>
              </Card.Body>
              <Card.Body className="p-3">
                <DataTable
                  columns={columns}
                  data={data}
                  customStyles={customStyles}
                  selectableRowSelected={rowSelectCriteria}
                  selectableRows
                  pagination
                  onSelectedRowsChange={handleChange}
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
