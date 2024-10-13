"use client";

import { Questionnaire } from "@/app/interfaces/questionnaire";
import React, { useEffect, useState } from "react";

const QUESTION_LIMIT = 20;
const OPTION_LIMIT = 4;

interface AddEditInterviewFormProps {
  questionnaire?: Questionnaire;
}

const AddEditInterviewForm: React.FC<AddEditInterviewFormProps> = ({
  questionnaire,
}) => {
  const [formData, setFormData] = useState<Questionnaire>({
    id: 0,
    title: "",
    description: "",
    difficulty: "easy",
    total: 1,
  });

  const [questions, setQuestions] = useState<
    { question: string; options: string[] }[]
  >([{ question: "", options: [""] }]);

  useEffect(() => {
    if (questionnaire) {
      setFormData({
        id: questionnaire.id || 0,
        title: questionnaire.title || "",
        description: questionnaire.description || "",
        difficulty: questionnaire.difficulty || "easy",
        total: questionnaire.total || 1,
      });
      setQuestions(
        questionnaire.questions || [{ question: "", options: [""] }],
      );
    }
  }, [questionnaire]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length < OPTION_LIMIT) {
      updatedQuestions[questionIndex].options.push("");
      setQuestions(updatedQuestions);
    }
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length > 1) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleAddQuestion = () => {
    if (questions.length < QUESTION_LIMIT) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { question: "", options: [""] },
      ]);
    }
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions.length > 1) {
      updatedQuestions.splice(questionIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    formData.total = questions.length;
    console.log({ ...formData, questions });
  };

  return (
    <div>
      <h1 className="font-semibold mt-4">Details</h1>
      <form className="grid grid-cols-2 pt-4 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            rows={4}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Total Questions</label>
          <input
            name="total"
            value={questions.length}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="number"
            readOnly
          />
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="flex flex-col col-span-full">
            <label>Question {qIndex + 1}</label>
            <input
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="outline-none border rounded-lg bg-transparent p-2"
              type="text"
              required
            />
            <label>Options</label>
            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center">
                <input
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="outline-none border rounded-lg bg-transparent p-2 flex-grow"
                  type="text"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(qIndex, oIndex)}
                  className={`bg-red-500 text-white p-1 ml-2 rounded transition-colors duration-200 hover:bg-red-600 ${
                    q.options.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={q.options.length <= 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddOption(qIndex)}
              className={`${
                q.options.length >= OPTION_LIMIT
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              } mt-2 p-1 rounded transition-colors duration-200`}
              disabled={q.options.length >= OPTION_LIMIT}
            >
              Add Option
            </button>
            <button
              type="button"
              onClick={() => handleRemoveQuestion(qIndex)}
              className={`bg-red-500 text-white p-1 mt-2 rounded transition-colors duration-200 hover:bg-red-600 ${
                questions.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={questions.length <= 1}
            >
              Remove Question
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          className={`${
            questions.length >= QUESTION_LIMIT
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          } mt-2 p-1 rounded col-span-full transition-colors duration-200`}
          disabled={questions.length >= QUESTION_LIMIT}
        >
          Add Question
        </button>

        <button
          className="bg-indigo-500 text-white p-2 rounded-lg font-semibold col-span-full hover:bg-indigo-600 transition-colors duration-200"
          type="submit"
        >
          {questionnaire ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEditInterviewForm;
