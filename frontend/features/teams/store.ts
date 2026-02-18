import { create } from "zustand";
import type { AmbulanceTeam } from "@/types";
import { mockAPI } from "@/lib/api/mock-api";

interface TeamsStore {
  teams: AmbulanceTeam[];
  isLoading: boolean;

  fetchTeams: () => Promise<void>;
}

export const useTeamsStore = create<TeamsStore>((set, get) => ({
  teams: [],
  isLoading: false,

  fetchTeams: async () => {
    try {
      set({ isLoading: true });
      const teams = await mockAPI.fetchAllTeams();
      set({ teams, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      set({ isLoading: false });
    }
  },
}));
