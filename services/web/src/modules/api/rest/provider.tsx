import * as React from "react";
import io from "socket.io-client";
import { ApiContext } from "./context";

export interface ISocketIOProviderProps {
  url: string;
  opts?: SocketIOClient.ConnectOpts;
}

export const SocketIOProvider: React.FC<ISocketIOProviderProps> = ({
  url,
  opts,
  children,
}) => {
  const socketRef = React.useRef<SocketIOClient.Socket>();

  if (typeof window === "undefined") {
    return <>{children}</>;
  }

  if (!socketRef.current) {
    socketRef.current = io(url, opts || {});
  }

  return (
    <ApiContext.Provider value={socketRef.current}>
      {children}
    </ApiContext.Provider>
  );
};
