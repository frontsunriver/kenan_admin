import { Container } from "react-bootstrap";
import { PageHeading } from "widgets";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { useToast } from "provider/ToastContext";
import CustomSelect from "components/CustomSelect";
import CustomInput from "components/CustomInput";
import ExpandComponent from "components/ExpandComponent";
import { Tree } from "primereact/tree";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const totalSelectedItems = [];
const AdminUserDetailPage = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [defaultValue, setDefaultValue] = useState();
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [treeData, setTreeData] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { showToast } = useToast();

  const validOption = [
    { value: 1, label: "Enabled" },
    { value: 0, label: "Disabled" },
  ];

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      grow: 4,
      sortable: true,
    },
  ];

  const buildTree = (data, rootLabel = "Admin Role") => {
    const tree = [];
    const lookup = {};

    // Create a lookup object
    data.forEach((item) => {
      lookup[item.id] = {
        key: item.id.toString(),
        label: item.name,
        data: item.url || "",
        children: [],
      };
    });

    // Build the tree structure
    data.forEach((item) => {
      if (item.parent === 0) {
        // Only add the top-level item if it doesn't already exist
        if (!tree.some((node) => node.key === lookup[item.id].key)) {
          tree.push(lookup[item.id]);
        }
      } else {
        // Ensure parent exists before adding child
        if (lookup[item.parent]) {
          lookup[item.parent].children.push(lookup[item.id]);
        }
      }
    });

    const rootNode = {
      key: "0",
      label: rootLabel,
      data: "",
      children: tree,
    };

    return [rootNode];
  };

  useEffect(() => {
    axios.post(`${SERVER_URL}/adminRole/getList`).then((res) => {
      const data = buildTree(res.data.data.data);
      setTreeData(data);
    });
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      axios.post(`${SERVER_URL}/admin/findById`, { id: id }).then((res) => {
        if (res.data.success) {
          setEmail(res.data.data[0].email);
          setDefaultValue(getOptionByValue(res.data.data[0].is_valid));
          setType(res.data.data[0].is_valid);
          axios
            .post(`${SERVER_URL}/adminRole/findByUserId`, { user_id: id })
            .then((res) => {
              if (res.data.success) {
                // setData(res.data.data);
                const updatedObject = {};

                res.data.data.forEach((item) => {
                  updatedObject[item.role_id] = {
                    checked: item.checked === 1, // Convert to boolean
                    partialChecked: item.partialChecked === 1, // Convert to boolean
                  };
                });

                setSelectedKeys(updatedObject);
              }
            });
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
    }
  }, [id]);

  const getOptionByValue = (value) => {
    return validOption.find((option) => option.value === value) || null;
  };

  const handleUpdate = async () => {
    if (email == "") {
      showToast("Error", "Please fill email!", "failure");
      return;
    }

    await axios
      .post(`${SERVER_URL}/admin/update`, {
        id: id,
        email: email,
        is_valid: type,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "User has been updated.", "success");
          // router.push("/adminuser");
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
    const resultArray = Object.entries(selectedKeys).map(([key, value]) => ({
      role_id: Number(key),
      checked: value.checked ? 1 : 0,
      partialChecked: value.partialChecked ? 1 : 0,
    }));

    await axios
      .post(`${SERVER_URL}/adminRole/batchUpdate`, {
        id: id,
        data: resultArray,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "User has been updated.", "success");
          router.push("/adminuser");
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.value);
  };

  const ExpandedComponent = ({ data }) => {
    return (
      <ExpandComponent
        data={data}
        totalSelectedItems={totalSelectedItems}
        id={id}
      />
    );
  };

  const handleSelectAll = async (e) => {
    e.preventDefault();
    await axios
      .post(`${SERVER_URL}/adminRole/selectAll`, {
        id: id,
      })
      .then((res) => {
        if (res.data.success) {
          showToast(
            "Success",
            "User has full access on this system.",
            "success"
          );
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
  };

  const handleDeselectAll = async (e) => {
    e.preventDefault();
    await axios
      .post(`${SERVER_URL}/adminRole/deselectAll`, {
        id: id,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", "User Role has been deleted all.", "success");
        } else {
          showToast("Error", "Something went wrong", "failure");
        }
      });
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Update administrator" />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div>
                <Form>
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <CustomInput
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Status
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <CustomSelect
                        options={validOption}
                        placeHolder="Select valid option"
                        onChange={handleChange}
                        className="border rounded"
                        defaultValue={defaultValue}
                        value={type}
                      />
                    </Col>
                  </Row>
                  {/* <Row className="mb-3">
                    <Col
                      md={4}
                      xs={4}
                      className="d-flex justify-content-between gap-3"
                    >
                      <button
                        className="form-control btn btn-success"
                        onClick={handleSelectAll}
                      >
                        Select All
                      </button>
                      <button
                        className="form-control btn btn-danger"
                        onClick={handleDeselectAll}
                      >
                        Deselect All
                      </button>
                    </Col>
                  </Row> */}
                  <Row>
                    {/* <DataTable
                      columns={columns}
                      data={data}
                      expandableRows
                      expandableRowsComponent={ExpandedComponent}
                    /> */}
                    <Tree
                      value={treeData}
                      selectionMode="checkbox"
                      selectionKeys={selectedKeys}
                      onSelectionChange={(e) => {
                        setSelectedKeys(e.value);
                      }}
                      className="border border-0"
                    />
                  </Row>
                  <Row className="align-items-center">
                    <Col
                      md={{ offset: 4, span: 8 }}
                      xs={8}
                      className="mt-4 d-flex justify-content-end gap-2"
                    >
                      <Button variant="green-secondary" onClick={handleUpdate}>
                        Update
                      </Button>
                      <Button variant="danger" onClick={() => router.back()}>
                        Back
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminUserDetailPage;
