import Uppy from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/react";
import React from "react";

export default function Uploader(props) {
  const uppy = React.useMemo(() => Uppy(), []);
  React.useEffect(() => () => uppy.close(), []);

  return <Dashboard uppy={uppy} plugins={["Webcam"]} {...props} />;
}
