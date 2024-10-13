import React from "react";
import Link from "next/link";
import QuestionnaireCard from "@/components/questionnaireCard/QuestionnaireCard";
import { Questionnaire } from "@/app/interfaces/questionnaire";

const mockQuestionnaire: Questionnaire[] = [
  {
    id: 1,
    title: "Full Stack Developer (Entry-Level)",
    description:
      "An entry-level questionnaire for full-stack developers with 0-2 years of experience",
    difficulty: "easy",
    total: 20,
  },
  {
    id: 2,
    title: "Full Stack Developer (Mid-Level)",
    description:
      "A mid-level questionnaire for full-stack developers with 2-4 years of experience",
    difficulty: "medium",
    total: 20,
  },
  {
    id: 3,
    title: "Full Stack Developer (Senior-Level)",
    description:
      "A senior-level questionnaire for full-stack developers with 4+ years of experience",
    difficulty: "hard",
    total: 20,
  },
];

const QuestionnaireSetupPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">INTERVIEW SETUP PAGE</h1>
        <Link
          href="/user/add"
          className="bg-indigo-500 text-white p-2 rounded-lg font-semibold"
        >
          + ADD QUESTIONNAIRE
        </Link>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        {mockQuestionnaire.map((questionnaire) => (
          <QuestionnaireCard
            key={questionnaire.id}
            questionnaireData={questionnaire}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionnaireSetupPage;
