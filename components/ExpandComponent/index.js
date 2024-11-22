import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "config/constant";

const ExpandComponent = ({ data, id }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        axios
          .post(`${SERVER_URL}/adminRole/removeRole`, {
            id: id,
            role_id: itemId,
          })
          .then((res) => {});
        return prevSelected.filter((id) => id !== itemId);
      } else {
        axios
          .post(`${SERVER_URL}/adminRole/addRole`, {
            user_id: id,
            role_id: itemId,
          })
          .then((res) => {});
        return [...prevSelected, itemId];
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${SERVER_URL}/adminRole/childRole`, {
          id: id,
          parent: data.id,
        });
        if (res.data.success) {
          const fetchedItems = res.data.data;
          setItems(fetchedItems);

          const initialSelected = fetchedItems
            .filter((item) => item.user_id !== null)
            .map((item) => item.id);
          setSelectedItems(initialSelected);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data.id]); // Ensure all relevant dependencies are included

  const RenderItem = (item) => {
    return (
      <div className="col-md-6 mb-1 mt-1" key={item.id}>
        <div className="card">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`checkbox-${item.id}`}
                checked={selectedItems.includes(item.id)} // Update checked state
                onChange={() => handleCheckboxChange(item.id)}
              />
              <label
                className="form-check-label"
                htmlFor={`checkbox-${item.id}`}
              >
                {item.name}
              </label>
            </div>
            <div>{item.url}</div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row col-sm-8 p-3" style={{ marginLeft: "40px" }}>
      {items.map(RenderItem)}
    </div>
  );
};

export default ExpandComponent;
