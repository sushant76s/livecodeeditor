import React from "react";
import { Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "10px 0",
        backgroundColor: "#fff",
        marginTop: "50px",
        bottom: "0px",
        position: "static",
        width: "100%",
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        Developed by{" "}
        <Link
          href="https://github.com/sushant76s/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sushant
        </Link>{" "}
        &copy;2024
      </Typography>
    </footer>
  );
};

export default Footer;
