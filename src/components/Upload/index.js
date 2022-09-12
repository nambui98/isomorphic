import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Icon, { UploadOutlined } from "@ant-design/icons";

import Button from "@iso/components/uielements/button";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const UploadFileCsv = ({ formikRef }) => {
  console.log("daksfhuweqfa", formikRef);
  // This state will store the parsed data
  const [data, setData] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      console.log("oiweqruyewqur", parsedData);
      // const columns = Object.keys(parsedData[1]);
      setData(parsedData);
    };

    reader.readAsText(file);
  };

  console.log("ewiohfyugsadyfas", data);

  useEffect(() => {
    const listMail = data
      .map((col, idx) => col?.mail_address)
      .filter(Boolean)
      .join(", ");
    console.log("sadfhuiewfa", listMail);
    formikRef?.setFieldsValue && formikRef.setFieldsValue({ email: listMail });
    formikRef?.current && formikRef.current.setFieldValue("email", listMail);
  }, [data, formikRef]);

  return (
    <div>
      <input prefix={<UploadOutlined />} onChange={handleFileChange} id="csvInput" name="file" type="File" style={{ display: "inline-block" }} />
      <Button icon={<UploadOutlined />} onClick={handleParse} type="dashed">
        Parse
      </Button>
      <div style={{ marginTop: "1rem", color: "red" }}>{error ?? error}</div>
    </div>
  );
};

export default UploadFileCsv;
