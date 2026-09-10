import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ControllerConfigure } from "@/components/controller-configure";
import { Button } from "@/components/ui/button";
import { controllerService } from "@/services/controllerService";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/_app/controllers/$controllerId")({
  component: ControllerDetailsPage,
});

function ControllerDetailsPage() {
  const { controllerId } = Route.useParams();
  const navigate = useNavigate();
  const controller = useNimble((s) =>
    s.controllers.find((item) => item.id === controllerId),
  );
  const unpair = useNimble((s) => s.unpairController);

  if (!controller) {
    return (
      <main className="px-8 py-16">
        <p className="text-muted-foreground">This controller is not paired.</p>
        <Button className="mt-6" variant="secondary" onClick={() => navigate({ to: "/controllers" })}>
          Back to controllers
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:px-8">
      <button
        type="button"
        className="focus-ring mb-6 grid size-11 place-items-center rounded-full bg-muted"
        onClick={() => navigate({ to: "/controllers" })}
        aria-label="Back"
      >
        <ArrowLeft className="size-5" />
      </button>
      <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
        {controllerService.bluetoothLabel(controller.bluetoothMode)}
      </p>
      <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight">
        {controller.name}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Player {controller.playerSlot ?? "—"} · Battery {controller.batteryLabel}
      </p>
      <div className="mt-8">
        <ControllerConfigure controller={controller} />
      </div>
      <Button
        variant="ghost"
        className="mt-8"
        onClick={() => {
          unpair(controller.id);
          void navigate({ to: "/controllers" });
        }}
      >
        Forget this controller
      </Button>
    </main>
  );
}
