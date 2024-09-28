import { QueryClient } from "@tanstack/react-query";
import { IconComponentProps } from "../components/icon/type";
import { Platform } from "react-native";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      networkMode: "online",
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
    mutations: {
      networkMode: "online",
    },
  },
});
export type Edge = "top" | "right" | "bottom" | "left";
export type EdgeMode = "off" | "additive" | "maximum";

export type EdgeRecord = Partial<Record<Edge, EdgeMode>>;
export type Edges = readonly Edge[] | Readonly<EdgeRecord>;

export const EDGES: Record<
  "LEFT" | "RIGHT" | "LEFT_RIGHT" | "TOP_BOTTOM" | "FULL" | "LEFT_RIGHT_BOTTOM",
  Edge[]
> = {
  LEFT: ["left"],
  RIGHT: ["right"],
  LEFT_RIGHT: ["left", "right"],
  LEFT_RIGHT_BOTTOM: ["left", "right", "bottom"],
  FULL: ["left", "right", "top", "bottom"],
  TOP_BOTTOM: ["top", "bottom"],
};
export const Helper = {
  isIOS: () => {
    return Platform.OS === "ios";
  },
  isAndroid: () => {
    return Platform.OS === "android";
  },
  isString(x: unknown): x is string {
    return typeof x === "string";
  },
  isEmptyObject(obj: {}) {
    if (obj) return Object.keys(obj).length === 0;
  },

  isNumber(x: unknown): x is number {
    return typeof x === "number";
  },
  isIcon(
    icon: IconComponentProps | React.ReactNode
  ): icon is IconComponentProps {
    return (icon as IconComponentProps)?.name !== undefined;
  },

  isStartWithChar: (x: string) => {
    if (!x) return x;
    if (x.includes("none")) return 0;
    return x.startsWith("_") ? Number(x.replace("_", "")) : x;
  },

  getKeyExtractor: (item: unknown, index: number): string => {
    return `${item}-${index}`;
  },

  generatorRandomColor: () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },

  formatSecondsToMinutes: (seconds: number) => {
    if (seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  },

  isNetworkError(e: unknown) {
    const str = String(e);
    return (
      str.includes("Abort") ||
      str.includes("Network request failed") ||
      str.includes("Failed to fetch") ||
      str.includes("Network Error") ||
      str.includes("timeout exceeded")
    );
  },
  isServerError(e: unknown) {
    const str = String(e);
    return (
      str.includes("Request failed with status code 502") ||
      str.includes("Request failed with status code 500")
    );
  },
};
