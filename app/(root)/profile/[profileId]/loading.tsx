import { ProfilPageSkeleton } from "@/components/shared/ProfilePageSkeleton";
import React from "react";

export default function loading() {
  return (
    <div className="profile-container">
      <ProfilPageSkeleton />
    </div>
  );
}
