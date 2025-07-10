import { Appsignal } from "@appsignal/nodejs";
import pino, { TransportTargetOptions } from "pino";

const targets: TransportTargetOptions[] = [
  // stdout
  { target: "pino/file", options: { destination: 1 } },
];

if (Appsignal.client?.isActive) {
  targets.push({
    target: "@appsignal/nodejs/pino",
    options: {
      group: "app",
    },
  });
}

export const logger = pino({ level: 'info' }, pino.transport({
  targets,
}));
