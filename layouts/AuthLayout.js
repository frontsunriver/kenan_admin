// import node module libraries
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const AuthLayout = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = "/images/background/bg-01.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/images/background/bg-01.jpg"
          style={{
            position: "absolute",
            width: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            visibility: imageLoaded ? "visible" : "hidden", // Control visibility based on load
          }}
        />
        <div className="d-flex flex-column container">{props.children}</div>
      </div>
    </>
  );
};
export default AuthLayout;
