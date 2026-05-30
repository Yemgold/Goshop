

import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { SectionCard } from "../../../components/ui/SectionCard"; 

import { useVendorSecurity } from "../../../hooks/vendor/useVendorSecurity";

import { revokeSession } from "../../../services/vendor/vendor.service"; 

export default function Security() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorSecurity();

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded" />
        <div className="h-64 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load security data.
      </div>
    );
  }

  const { security, sessions } = data;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Security Settings"
        subtitle="Protect your account and manage active sessions"
      />

      {/* SECURITY SETTINGS */}

      <SectionCard title="Account Security">
        <div className="space-y-3 text-sm">
          <p>Email: {security.email}</p>

          <p>
            2FA:
            <span className="ml-2 font-semibold">
              {security.twoFactorEnabled
                ? "Enabled"
                : "Disabled"}
            </span>
          </p>

          <p>
            Login Alerts:
            <span className="ml-2 font-semibold">
              {security.loginAlerts
                ? "On"
                : "Off"}
            </span>
          </p>

          <p>
            Last Password Change:{" "}
            {security.lastPasswordChange}
          </p>

          <button className="mt-3 px-4 py-2 bg-black text-white rounded">
            Change Password
          </button>
        </div>
      </SectionCard>

      {/* SESSIONS */}

      <SectionCard title="Active Sessions">
        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div className="text-sm">
                <p className="font-medium">
                  {s.device}
                </p>

                <p className="text-gray-500">
                  {s.location} •{" "}
                  {s.lastActive}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {s.isCurrent && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Current
                  </span>
                )}

                {!s.isCurrent && (
                  <button
                    disabled={
                      loadingId === s.id
                    }
                    onClick={async () => {
                      setLoadingId(s.id);

                      await revokeSession(
                        s.id
                      );

                      setLoadingId(null);

                      window.location.reload();
                    }}
                    className="text-red-600 text-sm"
                  >
                    {loadingId === s.id
                      ? "Revoking..."
                      : "Logout"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}