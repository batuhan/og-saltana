import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "./context";

export const useSocket = (
  eventKey?: string,
  callback?: (...args: any) => void
) => {
  const socket = useContext(ApiContext);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const socketHandlerRef = useRef(function(...args) {
    if (callbackRef.current) {
      callbackRef.current.apply(this, args);
    }
  });

  const subscribe = () => {
    if (eventKey) {
      socket.on(eventKey, socketHandlerRef.current);
    }
  };

  const unsubscribe = () => {
    if (eventKey) {
      socket.removeListener(eventKey, socketHandlerRef.current);
    }
  };

  useEffect(() => {
    subscribe();

    return unsubscribe;
  }, [eventKey]);

  return { socket, unsubscribe, subscribe };
};

export const useLastMessage = (eventKey: string) => {
  const socket = useContext(ApiContext);
  const [data, setData] = useState();

  const subscribe = () => {
    if (eventKey) {
      socket.on(eventKey, setData);
    }
  };

  const unsubscribe = () => {
    if (eventKey) {
      socket.removeListener(eventKey, setData);
    }
  };

  useEffect(() => {
    subscribe();

    return unsubscribe;
  }, [eventKey]);

  return { data, socket, unsubscribe, subscribe };
};
