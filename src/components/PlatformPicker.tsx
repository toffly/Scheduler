import { CheckCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface PlatformPickerProps {
  connectedIds: string[];
  connecting: string | null;
  onClose: () => void;
  onConnect: (platformId: string) => void;
}

const PlatformPicker = ({
  connectedIds,
  connecting,
  onClose,
  onConnect,
}: PlatformPickerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 shadow">
          <h3 className="text-slate-700">Choose a Platform</h3>
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <XIcon size={16} onClick={onClose} />
          </button>
        </div>

        {/* Platform list */}
        <div className="p-6 flex flex-col gap-2">
          {PLATFORMS.map((p) => {
            const isConnected = connectedIds.includes(p.id);
            const isConnecting = connecting === p.id;
            return (
              <button
                key={p.id}
                disabled={isConnected || isConnecting}
                onClick={() => onConnect(p.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${isConnected ? "border-red-200 bg-red-50 cursor-default" : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100 cursor-pointer"} ${isConnecting && "opacity-60"}`}
              >
                {/* Icon */}
                <div className="p-2">
                  <p.icon
                    className={`size-5 ${isConnected ? "text-red-600" : "text-slate-500"}`}
                  />
                </div>

                {/* Label */}
                <div className="fle-1 min-w-0">
                  <div
                    className={`tetx-sm ${isConnected ? "text-red-700" : "text-slate-800"}`}
                  >
                    {p.name}
                  </div>
                  <div className="tetx-xs text-slate-500 truncate">
                    {isConnected ? "Already connected" : p.description}
                  </div>
                </div>

                {/* Status */}
                {isConnected && (
                  <CheckCircleIcon className="size-4 text-red-500 shrink-0" />
                )}
                {isConnecting && (
                  <div className="size-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin shrink-0" />
                )}
                {!isConnected && !isConnecting && (
                  <ExternalLinkIcon className="size-4 text-slate-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformPicker;
