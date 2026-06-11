import type { QuizStepConfig } from "../model/types"

export const QUIZ_STEPS: QuizStepConfig[] = [
  {
    id: "name",
    type: "intro",
    title: "What’s your first name?",
  },
  {
    id: "smoke",
    type: "single",
    title: "Do you smoke?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "eating-habits",
    type: "single",
    title: "What is your eating habits?",
    options: [
      {
        label: "Vegan diet",
        value: "vegan diet",
      },
      {
        label: "Vegetarian diet",
        value: "vegetarian diet",
      },
      {
        label:
          "My diet is generally healthy and includes animal protein, fish and veggies",
        value:
          "my diet is generally healthy and includes animal protein, fish and veggies",
      },
      {
        label: "My diet includes fast food and soft drinks",
        value: "my diet includes fast food and soft drinks",
      },
    ],
  },
  {
    id: "alcoholic",
    type: "single",
    title: "How frequently do you consume alcoholic beverages?",
    options: [
      {
        label: "≤ 3 times per week",
        value: "≤ 3 times per week",
      },
      {
        label: "4 - 7 times per week",
        value: "4 - 7 times per week",
      },
      {
        label: "7+ times per week",
        value: "7+ times per week",
      },
    ],
  },
  {
    id: "cold",
    type: "single",
    title: "How frequently do you have cold/flu symptoms?",
    options: [
      {
        label: " ≤ 2 per year",
        value: " ≤ 2 per year",
      },
      {
        label: "3 - 5 times per year",
        value: "3 - 5 times per year",
      },
      {
        label: "5+ times per week",
        value: "5+ times per week",
      },
    ],
  },
  {
    id: "stress",
    type: "single",
    title: "Describe your stress level",
    options: [
      {
        label: " I feel calm and relaxed most of the time",
        value: " i feel calm and relaxed most of the time",
      },
      {
        label: "I get nerevous from time to time",
        value: "i get nerevous from time to time",
      },
      {
        label: "I’m under a lot of stress most of the time",
        value: "i’m under a lot of stress most of the time",
      },
    ],
  },
  {
    id: "glucose",
    type: "single",
    title: "Have you ever been diagnosted with high blood glucose level?",
    options: [
      {
        label: " Yes",
        value: " yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
  {
    id: "focus",
    type: "single",
    title: "Tell us what you want to focus on",
    options: [
      {
        label: " Weight managment",
        value: " weight managment",
      },
      {
        label: "Stress relief",
        value: "stress relief",
      },
      {
        label: "Immune boost",
        value: "immune boost",
      },
      {
        label: "Need to solve a sprcific problem",
        value: "need to solve a sprcific problem",
      },
      {
        label: "I need a bassic kit for a daily intake",
        value: "i need a bassic kit for a daily intake",
      },
      {
        label: "All in one",
        value: "all in one",
      },
    ],
  },
  {
    id: "email",
    type: "email",
    title: "What’s your email address?",
  },
]
