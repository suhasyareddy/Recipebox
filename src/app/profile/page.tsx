"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useFavourites } from "@/context/FavouritesContext";
import { fetchAllRecipes, deleteRecipe, uploadAvatarImage } from "@/lib/recipes";
import { DietaryBadge, DietaryPreferenceSelector } from "@/components/DietaryBadge";
import type { Recipe } from "@/lib/supabase/types";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, updateProfile, signOut, isConfigured } = useAuth();
  const { showToast } = useToast();
  const { favouriteIds } = useFavourites();

  const [activeTab, setActiveTab] = useState<"recipes" | "favourites">("recipes");
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  // Edit Profile Modal
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [dietary, setDietary] = useState("Vegetarian");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setBio(profile.bio || "");
      setDietary(profile.dietary_preference || "Vegetarian");
      setAvatarUrl(profile.avatar_url || "");
      setAvatarPreview(profile.avatar_url || "");
    }
  }, [profile]);

  useEffect(() => {
    async function load() {
      setIsLoadingRecipes(true);
      const data = await fetchAllRecipes();
      setAllRecipes(data);
      setIsLoadingRecipes(false);
    }
    load();
  }, []);

  const openEditModal = () => {
    setFullName(profile?.full_name || user?.user_metadata?.full_name || "");
    setBio(profile?.bio || user?.user_metadata?.bio || "");
    setDietary(profile?.dietary_preference || user?.user_metadata?.dietary_preference || "Vegetarian");
    setAvatarUrl(profile?.avatar_url || user?.user_metadata?.avatar_url || "");
    setAvatarPreview(profile?.avatar_url || user?.user_metadata?.avatar_url || "");
    setAvatarFile(null);
    setIsEditing(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      let finalAvatar = avatarUrl;
      if (avatarFile) {
        try {
          finalAvatar = await uploadAvatarImage(avatarFile, user?.id);
        } catch (uploadErr: any) {
          showToast("error", "Avatar Upload Failed", uploadErr?.message || "Could not upload the image. Please check Supabase Storage policies.");
          setIsSavingProfile(false);
          return;
        }
      }

      const { error } = await updateProfile({
        full_name: fullName.trim(),
        bio: bio.trim(),
        dietary_preference: dietary,
        avatar_url: finalAvatar,
      });

      if (error) {
        showToast("error", "Failed to update profile", error);
      } else {
        setAvatarUrl(finalAvatar);
        setAvatarPreview(finalAvatar);
        setAvatarFile(null);
        showToast("success", "Profile Updated", "Your culinary profile details have been saved.");
        setIsEditing(false);
      }
    } catch (err: any) {
      showToast("error", "Error", err?.message || "Could not save profile updates.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    showToast("info", "Signed Out", "You have been signed out of RecipeBox.");
    router.push("/login");
  };

  const myRecipes = allRecipes.filter(
    (r) =>
      r.user_id === user?.id ||
      r.author_name === profile?.full_name
  );

  const myFavourites = allRecipes.filter((r) => favouriteIds.includes(r.id));

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8">
      {/* Profile Header Card */}
      <section className="bg-surface-container-lowest p-6 sm:p-10 rounded-3xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/10 via-tertiary/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-surface shadow-md bg-surface-container shrink-0">
              <Image
                src={
                  profile?.avatar_url ||
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                }
                alt={profile?.full_name || "Profile avatar"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-on-surface">
                  {profile?.full_name || user?.user_metadata?.full_name || "Home Chef"}
                </h1>
                <DietaryBadge
                  preference={profile?.dietary_preference || profile?.food_preference || "Vegetarian"}
                  size="md"
                />
              </div>

              <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>{user?.email || profile?.email || ""}</span>
              </p>

              <p className="text-xs text-on-surface-variant max-w-xl leading-relaxed italic">
                &ldquo;{profile?.bio || "Preserving traditional homestyle Indian cooking secrets."}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={openEditModal}
              className="px-4 py-2.5 rounded-xl border border-outline-variant/40 hover:bg-surface-container text-xs font-bold text-on-surface flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              Edit Profile
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/15 text-primary text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick Kitchen Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-outline-variant/20">
          <div className="p-3 bg-surface-container-low rounded-2xl text-center">
            <p className="text-2xl font-bold font-editorial text-primary">{myRecipes.length}</p>
            <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Recipes Created
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-2xl text-center">
            <p className="text-2xl font-bold font-editorial text-secondary">{myFavourites.length}</p>
            <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Saved Favourites
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-2xl text-center">
            <p className="text-2xl font-bold font-editorial text-tertiary">7 Days</p>
            <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Active Meal Plan
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-2xl text-center">
            <p className="text-2xl font-bold font-editorial text-on-surface">18 Items</p>
            <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Mandi Grocery List
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("recipes")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "recipes"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            <span>My Uploaded Recipes ({myRecipes.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("favourites")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "favourites"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined text-base">favorite</span>
            <span>Saved Favourites ({myFavourites.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {isLoadingRecipes ? (
          <div className="py-16 text-center text-xs font-semibold text-on-surface-variant">
            Loading collection...
          </div>
        ) : activeTab === "recipes" ? (
          myRecipes.length === 0 ? (
            <div className="bg-surface-container-lowest p-10 rounded-3xl border border-outline-variant/30 text-center space-y-3">
              <p className="text-sm font-bold text-on-surface">No Recipes Added Yet</p>
              <p className="text-xs text-on-surface-variant">
                Document and save your first heirloom dish with step-by-step cooking steps.
              </p>
              <Link
                href="/recipes/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Create Recipe
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRecipes.map((r) => (
                <div
                  key={r.id}
                  className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-surface-container">
                    <Image
                      src={r.image_url}
                      alt={r.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <DietaryBadge tags={r.dietary_tags} title={r.title} size="sm" />
                      <span className="bg-surface-container-lowest/90 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {r.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <Link href={`/recipes/${r.id}`}>
                        <h3 className="font-editorial text-base font-bold text-on-surface hover:text-primary transition-colors line-clamp-1">
                          {r.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                        {r.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                      <Link
                        href={`/recipes/${r.id}/edit`}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Edit
                      </Link>
                      <Link
                        href={`/recipes/${r.id}`}
                        className="text-xs font-bold text-on-surface hover:text-primary flex items-center gap-1"
                      >
                        <span>View</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : myFavourites.length === 0 ? (
          <div className="bg-surface-container-lowest p-10 rounded-3xl border border-outline-variant/30 text-center space-y-3">
            <p className="text-sm font-bold text-on-surface">No Favourites Saved</p>
            <p className="text-xs text-on-surface-variant">
              Browse recipes and hit the heart icon to curate your personal cookbook.
            </p>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myFavourites.map((r) => (
              <div
                key={r.id}
                className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-surface-container">
                  <Image
                    src={r.image_url}
                    alt={r.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <DietaryBadge tags={r.dietary_tags} title={r.title} size="sm" />
                    <span className="bg-surface-container-lowest/90 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {r.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <Link href={`/recipes/${r.id}`}>
                      <h3 className="font-editorial text-base font-bold text-on-surface hover:text-primary transition-colors line-clamp-1">
                        {r.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                      {r.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                    <span className="text-[11px] text-on-surface-variant">
                      {r.prep_time + r.cook_time} mins
                    </span>
                    <Link
                      href={`/recipes/${r.id}`}
                      className="text-xs font-bold text-primary flex items-center gap-1"
                    >
                      <span>Cook</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl font-bold text-on-surface">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs text-on-surface"
                />
              </div>

              <DietaryPreferenceSelector value={dietary} onChange={setDietary} />

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Chef Bio / Family Note
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/40 text-xs text-on-surface resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 bg-surface-container shadow-inner">
                    <Image
                      src={
                        avatarPreview ||
                        avatarUrl ||
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                      }
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="w-full text-xs text-on-surface-variant file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary-container cursor-pointer"
                    />
                    <p className="text-[11px] text-on-surface-variant">
                      Upload a JPG, PNG or WebP image from your device.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={isSavingProfile}
                  className="px-4 py-2 rounded-xl border border-outline-variant/40 text-xs font-bold text-on-surface disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSavingProfile && (
                    <span className="material-symbols-outlined text-sm animate-spin">
                      progress_activity
                    </span>
                  )}
                  <span>
                    {isSavingProfile
                      ? avatarFile
                        ? "Uploading Photo & Saving..."
                        : "Saving Profile..."
                      : "Save Changes"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
