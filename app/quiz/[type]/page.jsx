"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getQuestions, shuffleQuestions } from "@/lib/questions";

export default function QuizPage({ params }) {
  const router = useRouter();
  const quizType = params.type;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    // Get and shuffle questions when component mounts
    if (quizType === "tech" || quizType === "non-tech") {
      const allQuestions = getQuestions(quizType);
      const shuffledQuestions = shuffleQuestions(allQuestions);
      setQuestions(shuffledQuestions);
      // Initialize userAnswers array
      setUserAnswers(new Array(shuffledQuestions.length).fill(null));
    } else {
      router.push("/");
    }
  }, [quizType, router]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0;

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    // Store the user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(newUserAnswers[currentQuestionIndex + 1]); // Load saved answer if exists
    } else {
      // Quiz completed, calculate results and navigate
      const finalAnswers = newUserAnswers;
      finalAnswers[currentQuestionIndex] = selectedOption;

      // Calculate score
      let score = 0;
      const wrongAnswers = [];

      questions.forEach((question, index) => {
        if (finalAnswers[index] === question.correctAnswer) {
          score++;
        } else {
          wrongAnswers.push({
            question: question.question,
            userAnswer: question.options[finalAnswers[index]] || "Not answered",
            correctAnswer: question.options[question.correctAnswer],
            questionIndex: index + 1,
          });
        }
      });

      // Store results in sessionStorage to pass to results page
      sessionStorage.setItem(
        "quizResults",
        JSON.stringify({
          score,
          total: questions.length,
          type: quizType,
          wrongAnswers,
        })
      );

      router.push("/results");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Store current answer before going back
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestionIndex] = selectedOption;
      setUserAnswers(newUserAnswers);

      // Go to previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(userAnswers[currentQuestionIndex - 1]);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 flex items-center justify-center">
        <Card className="w-full max-w-md bg-black/50 border-blue-500">
          <CardContent className="pt-6">
            <p className="text-center text-blue-300">Loading questions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            {quizType === "tech" ? "Tech Quiz" : "Non-Tech Quiz"}
          </h1>
          <p className="text-blue-200">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <Progress value={progress} className="h-2 mb-8" />

        <Card className="bg-black/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-xl text-blue-300">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption?.toString()}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-md border border-blue-800 cursor-pointer hover:bg-blue-900/20 ${
                    selectedOption === index
                      ? "bg-blue-900/30 border-blue-600"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="w-full cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex gap-3">
            {currentQuestionIndex > 0 && (
              <Button
                onClick={handlePreviousQuestion}
                variant="outline"
                className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
              >
                Previous
              </Button>
            )}
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
