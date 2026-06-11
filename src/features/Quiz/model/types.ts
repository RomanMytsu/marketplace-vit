export type StepType = "intro" | "single" | "multi" | "email"

export interface QuizOption {
  label: string
  value: string
  icon?: string
  sublabel?: string
}

export interface QuizStepConfig {
  id: string
  type: StepType
  title: string
  subtitle?: string
  options?: QuizOption[]
}

export interface QuizState {
  userName: string
  currentStep: number
  answers: Record<string, string | string[]>
}
