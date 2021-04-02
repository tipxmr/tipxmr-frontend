interface Streamer {}
interface Donor {}
interface Donation {}
interface Donor {}
interface StreamingStatus {}


// ###########################################################################

export interface CommonClientToServerEvents {
  connection: () => void;
}

export interface AnimationClientToServerEvents {
  getAnimationConfig: (username: string) => void;
}

export interface DonatorClientToServerEvents {
  getStreamer: (username: string) => void;
  getSubaddress: (displayName: string, username: string, _id: string, donor: Donor, message: string) => void;
  getOnlineStreamers: () => void;
}

export interface StreamerClientToServerEvents {
  login: (_id: string, username: string) => void;
  updateConfig: (streamerConfig: Streamer) => void;
  paymentRecieved: (donation: Donation) => void;
  subaddressToBackend: (donorInfo: Donor) => void;
  updateOnlineStatus: (_id: string, onlineStatus: StreamingStatus) => void;
  getAnimationConfig: (streamerName: string) => void;
}

// client-side: emit
// server-side: on
export type ClientToServerEvents =
  | CommonClientToServerEvents
  | AnimationClientToServerEvents
  | DonatorClientToServerEvents
  | StreamerClientToServerEvents;

// ###########################################################################

export interface CommonServerToClientEvents {
  connection: () => void;
  disconnect: () => void;
}

export interface AnimationServerToClientEvents {
  connection: () => void;
  disconnect: () => void;
  getAnimationConfig: (username: string) => void;
}

export interface DonatorServerToClientEvents {
  connection: () => void;
  disconnect: () => void;
  recieveStreamer: (streamer: Streamer) => void;
  subaddressToDonator: (data: any) => void;
  paymentConfirmation: (confirmation: any) => void;
  emitOnlineStreamers: (onlineStreamers: Streamer[]) => void;
}

export interface StreamerServerToClientEvents {
  connection: () => void;
  disconnect: () => void;
  createSubaddress: (subaddress: string) => void;
}

// client-side: on
// server-side: emit
export type ServerToClientEvents =
  | CommonServerToClientEvents
  | AnimationServerToClientEvents
  | DonatorServerToClientEvents
  | StreamerServerToClientEvents;
