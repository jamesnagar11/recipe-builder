export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  userCreated: (user: SocketData) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  createRandomUser: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  email: string;
}