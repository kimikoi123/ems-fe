import React from "react";
import Link from "next/link";

//TODO: Check in backend if user has already answered and pass in props
// On initial login we need to fetch this data and save to global state
interface InterviewProps {
  hasAnswered?: boolean;
}

const Interview: React.FC<InterviewProps> = ({ hasAnswered }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="font-bold text-2xl mb-6">Job Interview Questionnaire</h1>

      {!hasAnswered ? (
        <>
          <p className="text-lg text-gray-700 mb-6">
            This questionnaire is designed to assess your skills and knowledge.
            Please take your time, read the questions carefully, and answer to
            the best of your ability. Your total time answering this
            questionnaire will be monitored, so ensure you're in a quiet and
            comfortable environment before starting.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            This multiple-choice questionnaire is designed to assess your
            knowledge and skills relevant to the position. Please focus on
            selecting the correct answers, as they will be evaluated
            accordingly. Best of luck!
          </p>
          <div className="text-center">
            <Link href={`/interview/questionnaire`}>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition duration-200">
                Start Questionnaire
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for completing the questionnaire. Your answers have been
            successfully submitted and are currently being reviewed. We
            appreciate the time and effort you've taken to share your thoughts
            and skills with us.
          </p>

          <p className="text-lg text-gray-700 mb-8">
            If there is any further information required, or if we need
            clarification on any of your responses, we will reach out to you
            shortly. We value your patience during this review process. Good
            luck!
          </p>
        </>
      )}
    </div>
  );
};

export default Interview;
