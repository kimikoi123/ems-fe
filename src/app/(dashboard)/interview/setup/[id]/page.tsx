import AddEditInterviewForm from "@/components/form/AddEditInterviewForm";
import React from "react";
import { Questionnaire } from "@/app/interfaces/questionnaire";

const mockQuestionnaire: Questionnaire = {
  id: 1,
  title: "JavaScript Basics",
  description: "A basic questionnaire covering JavaScript fundamentals.",
  difficulty: "medium",
  total: 3,
  questions: [
    {
      question: "What is the correct syntax for a JavaScript arrow function?",
      options: ["function() => {}", "() => {}", "function => {}", "() -> {}"],
    },
    {
      question: "Which type of scope is created with 'let' and 'const'?",
      options: [
        "Global scope",
        "Block scope",
        "Function scope",
        "Module scope",
      ],
    },
    {
      question: "How can you convert a string to an integer in JavaScript?",
      options: [
        "int('123')",
        "parseInt('123')",
        "Number('123')",
        "Both 2 and 3",
      ],
    },
  ],
};

const EditInterview = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Questionnaire Edit Page</h1>
      <AddEditInterviewForm questionnaire={mockQuestionnaire} />
    </div>
  );
};

export default EditInterview;
