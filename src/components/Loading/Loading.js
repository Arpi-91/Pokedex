import React from "react";
import { dotStream } from "ldrs";

dotStream.register();
export default function Loading() {
  return (
    <div className="loader_container">
      <l-dot-stream size="68" speed="2.5" color="#397F84FF"></l-dot-stream>
    </div>
  );
}
