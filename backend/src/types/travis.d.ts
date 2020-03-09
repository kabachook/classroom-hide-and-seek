declare interface Organization {
  id: number;
  login: string;
  name: string | null;
  github_id: number;
}

declare interface EnvVar {
  id: string;
  name: string;
}

declare interface Build {
  id: number;
  number: string; // Don't ask me why, bacause API
  state: string;
  previous_state: string;
  duration: number;
}
