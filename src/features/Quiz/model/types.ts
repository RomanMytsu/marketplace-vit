export type StepType = "intro" | "single" | "multi" | "email"

export interface QuizOption {
  label: string
  value: string
}

export interface QuizStepConfig {
  id: string
  type: StepType
  title: string
  subtitle?: string
  options?: QuizOption[]
  layout?: "stack" | "grid"
  layoutSize?: "standard" | "wide"
  optionVariant?: "tiles" | "rows"
  inputLabel?: string
  inputType?: string
  validationType?: "name" | "email"
}

export interface QuizState {
  currentStep: number
  answers: Record<string, string | string[]>
}
