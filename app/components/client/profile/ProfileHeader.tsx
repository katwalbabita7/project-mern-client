"use client";

import { ProfileHeaderProps } from "@/app/types/client/profile";
import Image from "next/image";
import { LuPhone } from "react-icons/lu";


const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const profileImg = user?.profile_image?.path;
  const displayName = user?.full_name || "User";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#0058BE] bg-neutral-100 relative shrink-0 flex items-center justify-center text-3xl font-bold text-[#091426]">
        {profileImg ? (
          <Image src={profileImg} alt={displayName} fill className="object-cover" />
        ) : (
          displayName.charAt(0).toUpperCase()
        )}
      </div>

      <div className="space-y-1.5 text-center sm:text-left flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#091426]">{displayName}</h1>
        <p className="text-sm text-neutral-500">{user?.email}</p>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
          <span className="bg-secondary-50 text-secondary-700 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
            Role: {user?.role || "User"}
          </span>
          {user?.phone && (
            <span className="bg-neutral-100 text-neutral-600 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <LuPhone size={12} /> {user.phone}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;