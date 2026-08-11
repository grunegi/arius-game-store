"use client";

import Image from "next/image";
import useAuthStore from "../../js/AuthStore";
import { updateUser } from "../../js/login-register";
import { editPeofileSchema } from "../../schemas/editProfileSchema";
import { uploadAvatar } from "../../js/login-register";

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

export default function EditProfile() {

  const user = useAuthStore((state) => state.user);
  const updatedUser = useAuthStore((state) => state.updateUser);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.avatar_url || "");
  const [firstName, lastName] = (user?.username || "").split("_");
  const inputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPeofileSchema),
  });

  if(!user) return null;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return null;

    setSelectedFile(file);
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  const handleUpdate = async (data) => {
    let avatarUrl = user.avatar_url;

    if (selectedFile) {
      avatarUrl = await uploadAvatar(selectedFile);
    }

    await updateUser(user.id, {
      username: `${data.firstName}_${data.lastName}`.toLowerCase(),
      bio: data.bio,
      avatar_url: avatarUrl,
    });

    updateUserStore(updatedUser);
  };

  const handleRef = () => {
    inputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Edit Profile</h1>

          <p className="mt-2 text-zinc-400">
            Update your personal information.
          </p>
        </div>

        {/* Avatar */}
        <div className="mb-10 flex flex-col items-center">
          <div className="overflow-hidden rounded-full border-4 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,.25)]">
            <Image
              src={preview || "/images/defultPicture.jfif"}
              loading="eager"
              alt="avatar"
              width={120}
              height={120}
              className="h-30 w-30 object-cover"
            />

            <input
              accept="image/*"
              id="avatar"
              onChange={handleAvatarChange}
              type="file"
              hidden
              ref={inputRef}
            />
          </div>

          <button
            onClick={handleRef}
            className="
               mt-5
               rounded-xl
               bg-purple-600
               px-5
               py-2
               text-sm
               font-medium
               text-white
               transition
               hover:bg-purple-500"
          >
            Change Avatar
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(handleUpdate)}>
          {/* Email */}

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Email</label>

            <input
              defaultValue={user.email}
              disabled
              type="text"
              className="
               w-full
               rounded-xl
               border
               border-zinc-700
               bg-zinc-800
               px-4
               py-3
               text-gray-400
               placeholder:text-zinc-500
               focus:border-purple-500
               focus:outline-none"
            />
          </div>

          {/* Name */}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                First Name
              </label>

              <input
                {...register("firstName")}
                defaultValue={firstName}
                type="text"
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-800
                  px-4
                  py-3
                  text-white
                  focus:border-purple-500
                  focus:outline-none"
              />

              {errors.firstName && (
                <div className="mt-2 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                  {errors.firstName.message}
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Last Name
              </label>

              <input
                {...register("lastName")}
                defaultValue={lastName}
                type="text"
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-800
                  px-4
                  py-3
                  text-white
                  focus:border-purple-500
                  focus:outline-none"
              />

              {errors.lastName && (
                <div className="mt-2 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                  {errors.lastName.message}
                </div>
              )}
            </div>
          </div>

          {/* Bio */}

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Bio</label>

            <textarea
              {...register("bio")}
              defaultValue={user.bio}
              rows={5}
              className="
               w-full
               resize-none
               rounded-xl
               border
               border-zinc-700
               bg-zinc-800
               px-4
               py-3
               text-white
               placeholder:text-zinc-500
               focus:border-purple-500
               focus:outline-none"
              placeholder="Tell something about yourself..."
            />

            {errors.bio && (
              <div className="mt-2 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                {errors.bio.message}
              </div>
            )}
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => {
                redirect("/profile");
              }}
              type="button"
              className="
               rounded-xl
               border
               border-zinc-700
               px-6
               py-3
               text-zinc-300
               transition
               hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
               rounded-xl
               bg-purple-600
               px-6
               py-3
               font-medium
               text-white
               transition
               hover:bg-purple-500
               hover:shadow-[0_0_25px_rgba(168,85,247,.35)]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
