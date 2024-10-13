import React from "react";
import Link from "next/link";
import { Questionnaire } from "@/app/interfaces/questionnaire";

interface QuestionnaireCardProps {
  questionnaireData: Questionnaire;
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({
  questionnaireData,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Title</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Difficulty</th>
            <th className="border px-4 py-2 text-left">Total</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{questionnaireData.id}</td>
            <td className="border px-4 py-2">{questionnaireData.title}</td>
            <td className="border px-4 py-2">
              {questionnaireData.description}
            </td>
            <td className="border px-4 py-2">
              {questionnaireData.difficulty.toUpperCase()}
            </td>
            <td className="border px-4 py-2">{questionnaireData.total}</td>
            <td className="border px-4 py-2">
              <Link href={`/interview/setup/${questionnaireData.id}`}>
                <button className="bg-blue-500 text-white p-2 rounded">
                  Edit Questionnaire
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuestionnaireCard;
