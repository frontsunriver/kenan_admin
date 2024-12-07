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
    { name: "Name", selector: (row) => row.name, grow: 1, sortable: true },
  ];

  const rowSelectCriteria = (row) => row.is_selected;

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

  const getDataList = async () => {
    selectedRecord = [];
    try {
      const response = await axios.post(`${SERVER_URL}/group/getAll`);
      if (response.data.status == 200) {
        setData(response.data.data.data);
        const res = await axios.post(`${SERVER_URL}/groupUser/findByUserId`, {
          user_id: id,
        });
        if (res.data.status == 200) {
          const userPortIds = res.data.data.data.map((item) => item.group_id);
          const updatedPortList = response.data.data.data.map((item) => ({
            ...item,
            is_selected: userPortIds.includes(item.id),
          }));
          selectedRecord = updatedPortList.filter((item) => item.is_selected);
          setData(updatedPortList);
        } else {
          showToast("Error", "Error fetching user group list", "failure");
        }
      } else {
        showToast("Error", "Error fetching user group list", "failure");
      }
    } catch (error) {
      showToast("Error", "An unexpected error occurred", "failure");
    }
  };

  useEffect(() => {
    if (id) {
      getDataList();
    }
  }, []);

  const handleChange = (e) => {
    selectedRecord = [];
    selectedRecord = e.selectedRows;
  };

  const handleUpdate = async () => {
    await axios
      .post(`${SERVER_URL}/groupUser/batchUpdate`, {
        data: selectedRecord,
        id: id,
      })
      .then((res) => {
        if (res.data.success) {
          getDataList();
          showToast("Success", "Group user updated successfully", "success");
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
            <h1 className="mb-1 h2 fw-bold">Group User Management</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Tab.Container defaultActiveKey="design">
            <Card>
              <Card.Body className="d-flex justify-content-end gap-2">
                <Button variant="green-secondary" onClick={handleUpdate}>
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
