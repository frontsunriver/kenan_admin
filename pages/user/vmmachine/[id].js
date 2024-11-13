import { useEffect, useState } from "react";
import { Col, Row, Card, Tab, Container, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let selectedRecord = [];
const UserManagementPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const columns = [
    { name: "Title", selector: (row) => row.title, grow: 1, sortable: true },
    {
      name: "Password",
      selector: (row) => row.password,
      grow: 1,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      grow: 3,
      sortable: true,
    },
    {
      name: "Download URL",
      selector: (row) => row.download_url,
      grow: 2,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
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

  const getVmList = async () => {
    selectedRecord = [];
    try {
      const response = await axios.post(`${SERVER_URL}/vmimage/getAll`);
      if (response.data.success) {
        setData(response.data.data);
        const res = await axios.post(`${SERVER_URL}/uservm/findByUserId`, {
          user_id: id,
        });
        if (res.data.status == 200) {
          const vmImageIds = res.data.data.data.map((item) => item.vm_image_id);
          const updatedVMList = response.data.data.map((item) => ({
            ...item,
            is_selected: vmImageIds.includes(item.id),
          }));
          selectedRecord = updatedVMList.filter((item) => item.is_selected);
          setData(updatedVMList);
        } else {
          toast.error("Error fetching user VM list");
        }
      } else {
        toast.error("Error fetching VM list");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (id) {
      getVmList();
    }
  }, []);

  const handleChange = (e) => {
    selectedRecord = [];
    console.log(e.selectedRows);
    selectedRecord = e.selectedRows;
  };

  const handleUpdate = async () => {
    await axios
      .post(`${SERVER_URL}/uservm/batchUpdate`, {
        data: selectedRecord,
        id: id,
      })
      .then((res) => {});
    router.push("/user");
  };

  return (
    <Container fluid className="p-6">
      <ToastContainer />
      <Row>
        <Col lg={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <h1 className="mb-1 h2 fw-bold">User VM Image Management</h1>
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Tab.Container defaultActiveKey="design">
            <Card>
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
