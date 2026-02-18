// Core types for MedRoute emergency dispatch system

export type Priority = "red" | "yellow" | "green";
export type CallStatus = "pending" | "assigned" | "completed" | "postponed";
export type TeamStatus = "available" | "busy" | "en_route";
export type Sex = "male" | "female";
export type SystemStatus = "online" | "limited" | "manual";

export interface Location {
  lat: number;
  lon: number;
}

export interface Patient {
  id: string;
  age: number;
  sex: Sex;
  hasCardiovascular: boolean;
  hasDiabetes: boolean;
  hasAsthma: boolean;
  previousCalls: number;
}

export interface Complaint {
  raw: string;
  processed: string; // AI interpretation
}

export interface AIPrediction {
  priority: Priority;
  confidence: number; // 0-100
  modelVersion: string;
  topSymptoms: string[];
}

export interface TeamRecommendation {
  teamType: string;
  teamId: string | null;
  eta: number; // minutes
}

export interface Call {
  id: string;
  callTime: Date;
  priority: Priority;
  patient: Patient;
  complaint: Complaint;
  district: string;
  location: Location;
  aiPrediction: AIPrediction;
  recommendation: TeamRecommendation;
  status: CallStatus;
  postponedAt?: Date;
}

export interface AmbulanceTeam {
  id: string;
  teamType: string;
  status: TeamStatus;
  location: Location;
  eta?: number;
  updatedAt: Date;
}

export interface Decision {
  id: string;
  callId: string;
  callTime: Date;
  aiPriority: Priority;
  finalPriority: Priority;
  wasOverridden: boolean;
  overrideReason: string | null;
  assignedTeamId: string;
  dispatcherId: string;
  dispatcherName: string;
  decidedAt: Date;
}

export interface Dispatcher {
  id: string;
  name: string;
  role: "dispatcher" | "supervisor" | "analyst";
}

export interface DecisionFilters {
  priority: Priority | "all";
  dispatcher: string | "all";
  date: string | null;
}
