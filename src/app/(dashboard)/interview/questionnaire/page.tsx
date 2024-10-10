"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Interview from "../page";
import Modal from "@/components/modal/Modal";
interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "What is the primary language used for web development?",
    options: [
      "Python",
      "JavaScript", // Correct answer
      "Java",
      "C#",
    ],
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: [
      "Django",
      "Spring",
      "React", // Correct answer
      "Flask",
    ],
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets", // Correct answer
      "Computer Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Sheets",
    ],
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: [
      "<css>",
      "<style>", // Correct answer
      "<script>",
      "<styles>",
    ],
  },
  {
    question: "Which company developed the Java programming language?",
    options: [
      "Microsoft",
      "Sun Microsystems", // Correct answer
      "Oracle",
      "IBM",
    ],
  },
  {
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    options: [
      "Refers to the global object",
      "Refers to the calling object", // Correct answer
      "Refers to the function itself",
      "Refers to the document object",
    ],
  },
  {
    question: "Which of the following is not a programming paradigm?",
    options: [
      "Object-oriented",
      "Functional",
      "Procedural",
      "Networked", // Correct answer
    ],
  },
  {
    question: "What is the correct syntax to create a function in JavaScript?",
    options: [
      "function myFunction() {}", // Correct answer
      "create myFunction() {}",
      "function: myFunction() {}",
      "myFunction() = function {}",
    ],
  },
  {
    question: "Which of the following is used to style web pages?",
    options: [
      "HTML",
      "CSS", // Correct answer
      "JavaScript",
      "XML",
    ],
  },
  {
    question:
      "Which method is used to access an HTML element by its id in JavaScript?",
    options: [
      "getElementById()", // Correct answer
      "getElement()",
      "querySelector()",
      "getId()",
    ],
  },
  {
    question: "What does JSON stand for?",
    options: [
      "JavaScript Object Notation", // Correct answer
      "JavaScript Online Notation",
      "Java Standard Object Notation",
      "JavaScript Object Network",
    ],
  },
  {
    question:
      "Which operator is used to compare both value and type in JavaScript?",
    options: [
      "==",
      "===", // Correct answer
      "!=",
      "!==",
    ],
  },
  {
    question: "Which of the following is a back-end programming language?",
    options: [
      "HTML",
      "JavaScript",
      "Ruby", // Correct answer
      "CSS",
    ],
  },
  {
    question:
      "Which HTML element is used to define a footer for a document or section?",
    options: [
      "<bottom>",
      "<footer>", // Correct answer
      "<section>",
      "<aside>",
    ],
  },
  {
    question: "What is the purpose of the <head> tag in HTML?",
    options: [
      "To define the main content",
      "To define metadata and links to scripts and styles", // Correct answer
      "To create navigation",
      "To display a title",
    ],
  },
  {
    question: "Which of the following is a NoSQL database?",
    options: [
      "MySQL",
      "PostgreSQL",
      "MongoDB", // Correct answer
      "SQLite",
    ],
  },
  {
    question:
      "Which of the following is a valid way to declare a variable in JavaScript?",
    options: [
      "var myVar;", // Correct answer
      "variable myVar;",
      "let myVar = ;",
      "define myVar;",
    ],
  },
  {
    question: "Which keyword is used to create a class in JavaScript?",
    options: [
      "class", // Correct answer
      "create",
      "function",
      "object",
    ],
  },
  {
    question:
      "What is the default value of an uninitialized variable in JavaScript?",
    options: [
      "undefined", // Correct answer
      "null",
      "0",
      "NaN",
    ],
  },
  {
    question: "Which of the following is a feature of functional programming?",
    options: [
      "State is mutable",
      "Functions are first-class citizens", // Correct answer
      "Objects are the main focus",
      "Using loops extensively",
    ],
  },
];

interface QuestionnaireProps {
  params: {
    hasAnswered?: boolean;
  };
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  params,
}: QuestionnaireProps) => {
  const { hasAnswered } = params;
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (hasAnswered) {
    return <Interview params={{ hasAnswered: true }} />;
  }

  const handleOptionSelect = (option: string) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsModalOpen(true); // Open modal when last question is reached and Finish is clicked
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    router.push("/interview");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="font-bold text-2xl mb-6">Job Interview Questionnaire</h1>
      <h2 className="text-lg font-semibold mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}:{" "}
        {questions[currentQuestionIndex].question}
      </h2>
      <div className="space-y-2">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            className={`w-full px-4 py-2 rounded-lg hover:bg-gray-300 ${
              selectedOptions[currentQuestionIndex] === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className={`px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 ${
            currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={`px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400`}
        >
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
      >
        <div className="pb-4">
          <h3 className="text-xl font-semibold">Submit your answers?</h3>
        </div>
        {selectedOptions.includes(null) ? (
          <div>
            <p className="pb-2">
              You haven&apos;t answered the following questions:
            </p>
            <ul className="list-disc list-inside">
              {selectedOptions.map((option, index) =>
                option === null ? (
                  <li key={index}>Question {index + 1}</li>
                ) : null,
              )}
            </ul>
            <p className="pt-2">
              Are you sure you want to submit your answers?
            </p>
          </div>
        ) : (
          <p>Are you sure you want to submit your answers?</p>
        )}
      </Modal>
    </div>
  );
};

export default Questionnaire;
