import { Container } from "react-bootstrap";

import { PageHeading } from "widgets";

import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";

import { FormSelect } from "widgets";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryDetailPage = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const countryOptions = [
    { value: "1", label: "Stream" },
    { value: "2", label: "Event" },
  ];

  useEffect(() => {
    if (id !== undefined) {
      axios
        .post(`${SERVER_URL}/category/findAdminById`, { id: id })
        .then((res) => {
          if (res.data.success) {
            setImage(res.data.data[0].image);
            setName(res.data.data[0].name);
            setContent(res.data.data[0].content);
            setType(res.data.data[0].flag);
            setPreview(`${res.data.data[0]["image"]}`);
          } else {
            // toast.error(res.data.message);
          }
        });
    }
  }, [id]);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpdate = async () => {
    if (name == "") {
      toast.error("Please fill name!");
      return;
    }
    if (content == "") {
      toast.error("Please fill content!");
      return;
    }
    if (type == "") {
      toast.error("Please select type!");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", selectedFile != null ? selectedFile : image);
    formData.append("name", name);
    formData.append("content", content);
    formData.append("type", type);

    await axios
      .post(`${SERVER_URL}/category/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Category has been updated successfully");
        } else {
          console.log("error");
        }
      });
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Create Category" />
      <ToastContainer />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            {/* card body */}
            <Card.Body>
              <div>
                <Form>
                  {/* row */}
                  <Row className="mb-3">
                    <label
                      htmlFor="fullName"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Name
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        id="Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-sm-4 col-form-label
                    form-label"
                    >
                      Content
                    </label>
                    <div className="col-sm-4 mb-3 mb-lg-0">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Content"
                        value={content}
                        id="Name"
                        required
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Type
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <Form.Control
                        as={FormSelect}
                        placeholder="Select Type"
                        id="country"
                        value={type}
                        options={countryOptions}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="type">
                      Cover Image
                    </Form.Label>
                    <Col md={4} xs={4}>
                      <div className="flex-1 flex flex-col gap-3 w-full">
                        <div className="flex justify-center items-center">
                          <div className="text-center">
                            <input
                              type="file"
                              onChange={onFileChange}
                              style={{ display: "none" }}
                              id="profilePictureInput"
                            />
                            <label htmlFor="profilePictureInput">
                              <div
                                style={{
                                  width: "200px",
                                  height: "300px",
                                  backgroundColor: "#d3d3d3",
                                  display: "flex",
                                  borderRadius: "20px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  backgroundImage: preview
                                    ? `url(${preview})`
                                    : "none",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                }}
                              >
                                {!preview && (
                                  <i className={`nav-icon fe fe-upload`}></i>
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col
                      md={{ offset: 4, span: 8 }}
                      xs={8}
                      className="mt-4 d-flex justify-content-end "
                    >
                      <Button variant="primary" onClick={handleUpdate}>
                        Update
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

export default CategoryDetailPage;
