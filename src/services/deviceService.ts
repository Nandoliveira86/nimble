import { delay } from "@/lib/utils";
import { DEVICES, HOST_DEVICE_ID } from "@/mocks/devices";
import type { Device } from "@/types/nimble";

let devices: Device[] = DEVICES.map((device) => ({ ...device }));

function clone(device: Device): Device {
  return { ...device };
}

function syncHost(online: boolean) {
  devices = devices.map((device) => {
    if (!device.isHost) return device;
    return {
      ...device,
      status: online ? "online" : "offline",
      lastSeenLabel: online ? "now" : "just now",
      readyLabel: online ? "Ready to play" : undefined,
      connectionQuality: online ? "excellent" : undefined,
    };
  });
}

export const deviceService = {
  list(): Device[] {
    return devices.map(clone);
  },

  host(): Device | undefined {
    return devices.find((device) => device.id === HOST_DEVICE_ID);
  },

  isHostOnline(): boolean {
    return this.host()?.status === "online";
  },

  setHostOnline(online: boolean): Device[] {
    syncHost(online);
    return this.list();
  },

  async wakeHost(): Promise<Device[]> {
    await delay(1800);
    return this.setHostOnline(true);
  },

  sleepHost(): Device[] {
    return this.setHostOnline(false);
  },
};
