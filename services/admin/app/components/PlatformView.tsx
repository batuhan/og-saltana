import { useState } from "react";
import { Link } from "remix";


export default function PlatformView({ platformData }) {
  return (
    <div>
      <pre>{JSON.stringify(platformData, null, 2)}</pre>
    </div>
  )
}
