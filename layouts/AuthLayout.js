// import node module libraries
import { Container } from "react-bootstrap";

const AuthLayout = (props) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevent overflow
        display: "flex", // Use flexbox
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
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
        }}
      />
      <div className="d-flex flex-column container">{props.children}</div>
    </div>
  );
};
export default AuthLayout;
