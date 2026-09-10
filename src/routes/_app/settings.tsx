import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/_app/settings")({ component: SettingsPage });

const SECTIONS = [
  "Streaming",
  "Display",
  "Audio",
  "Controller",
  "Account",
  "Advanced",
] as const;

function ChoiceRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            data-focusable
            onClick={() => onChange(option.id)}
            className={cn(
              "h-10 rounded-full px-4 text-sm",
              value === option.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  const [section, setSection] = useState<(typeof SECTIONS)[number]>("Streaming");
  const store = useNimble();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Settings</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[14rem_minmax(0,1fr)]">
        <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {SECTIONS.map((item) => (
            <button
              key={item}
              type="button"
              data-focusable
              onClick={() => setSection(item)}
              className={cn(
                "h-11 shrink-0 rounded-lg px-4 text-left text-sm font-medium",
                section === item
                  ? "bg-card text-foreground shadow-[var(--shadow-border)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          {section === "Streaming" ? (
            <>
              <ChoiceRow
                label="Automatic quality"
                value={store.qualityProfileId}
                onChange={store.setQualityProfile}
                options={store.profiles.map((profile) => ({
                  id: profile.id,
                  label: profile.name,
                }))}
              />
              <label className="flex items-center justify-between rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
                <span className="text-sm font-medium">Prefer low latency</span>
                <Switch
                  checked={store.preferLowLatency}
                  onCheckedChange={store.setPreferLowLatency}
                />
              </label>
              <ChoiceRow
                label="Data usage"
                value={store.dataUsage}
                onChange={store.setDataUsage}
                options={[
                  { id: "standard", label: "Standard" },
                  { id: "save", label: "Save data" },
                ]}
              />
            </>
          ) : null}

          {section === "Display" ? (
            <>
              <ChoiceRow
                label="Resolution"
                value={store.displayResolution}
                onChange={store.setDisplayResolution}
                options={[
                  { id: "automatic", label: "Automatic" },
                  { id: "1080p", label: "1080p" },
                  { id: "1440p", label: "1440p" },
                  { id: "4k", label: "4K" },
                ]}
              />
              <ChoiceRow
                label="HDR"
                value={store.hdr}
                onChange={store.setHdr}
                options={[
                  { id: "automatic", label: "Automatic" },
                  { id: "on", label: "On" },
                  { id: "off", label: "Off" },
                ]}
              />
            </>
          ) : null}

          {section === "Audio" ? (
            <div className="rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
              <p className="text-sm font-medium">Output</p>
              <p className="mt-1 text-sm text-muted-foreground">This device</p>
              <label className="mt-5 block text-sm font-medium">
                Volume
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={store.volume}
                  onChange={(event) => store.setVolume(Number(event.target.value))}
                  className="mt-3 w-full accent-primary"
                />
              </label>
            </div>
          ) : null}

          {section === "Controller" ? (
            <>
              <div className="rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
                <p className="text-sm text-muted-foreground">Paired controllers</p>
                <p className="mt-1 text-lg font-medium">
                  {store.controllers.length
                    ? store.controllers
                        .map((pad) => `P${pad.playerSlot} · ${pad.name}`)
                        .join("  ·  ")
                    : "None yet"}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Xbox, PlayStation, and classic Bluetooth 2.0 / 3.0 pads can play
                  at the same time. Nimble sends each one to your PC as a gamepad.
                </p>
                <Link
                  to="/controllers"
                  className="mt-4 inline-flex h-10 items-center text-sm font-medium underline-offset-4 hover:underline"
                >
                  Manage controllers
                </Link>
              </div>
              <label className="flex items-center justify-between rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
                <span className="text-sm font-medium">Vibration</span>
                <Switch checked={store.vibration} onCheckedChange={store.setVibration} />
              </label>
            </>
          ) : null}

          {section === "Account" ? (
            <div className="rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <p className="mt-1 text-lg font-medium">{store.user?.name ?? "Bruno"}</p>
              <p className="mt-3 text-sm">
                {store.isPremium ? "Nimble Premium" : "Standard"}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Premium members can recommend sources on Find. Ratings and store
                listings are open to everyone.
              </p>
              <button
                type="button"
                className="mt-4 text-sm font-medium underline-offset-4 hover:underline"
                onClick={() => store.setPremium(!store.isPremium)}
              >
                {store.isPremium ? "Leave Premium" : "Become Premium"}
              </button>
            </div>
          ) : null}

          {section === "Advanced" ? (
            <>
              <p className="text-sm text-muted-foreground">
                Most people never need this. Nimble already chooses the right picture.
              </p>
              <button
                type="button"
                className="text-sm text-foreground underline-offset-4 hover:underline"
                onClick={() => setAdvancedOpen((open) => !open)}
              >
                {advancedOpen ? "Hide advanced" : "Show advanced"}
              </button>
              {advancedOpen ? (
                <div className="space-y-4">
                  <ChoiceRow
                    label="Resolution"
                    value={store.displayResolution}
                    onChange={store.setDisplayResolution}
                    options={[
                      { id: "automatic", label: "Automatic" },
                      { id: "1080p", label: "1080p" },
                      { id: "1440p", label: "1440p" },
                      { id: "4k", label: "4K" },
                    ]}
                  />
                  <ChoiceRow
                    label="Frame rate"
                    value={store.frameRate}
                    onChange={store.setFrameRate}
                    options={[
                      { id: "automatic", label: "Automatic" },
                      { id: "60", label: "60" },
                      { id: "120", label: "120" },
                    ]}
                  />
                  <ChoiceRow
                    label="HDR"
                    value={store.hdr}
                    onChange={store.setHdr}
                    options={[
                      { id: "automatic", label: "Automatic" },
                      { id: "on", label: "On" },
                      { id: "off", label: "Off" },
                    ]}
                  />
                  <ChoiceRow
                    label="Decoder"
                    value={store.decoder}
                    onChange={store.setDecoder}
                    options={[
                      { id: "automatic", label: "Automatic" },
                      { id: "hardware", label: "Hardware" },
                      { id: "software", label: "Software" },
                    ]}
                  />
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
