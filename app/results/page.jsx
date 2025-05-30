"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CircleCheck, Trophy } from "lucide-react";

export default function ResultsPage() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Get results from sessionStorage
    const storedResults = sessionStorage.getItem("quizResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 flex items-center justify-center">
        <Card className="w-full max-w-md bg-black/50 border-blue-500">
          <CardContent className="pt-6">
            <p className="text-center text-blue-300">Loading results...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { score, total, type, wrongAnswers } = results;
  const percentage = Math.round((score / total) * 100);

  const getFeedback = () => {
    if (percentage >= 80) {
      return "🎉 Congratulations! You've won a prize!";
    } else if (percentage >= 60) {
      return "Good job! You know your stuff!";
    } else if (percentage >= 40) {
      return "Not bad! Keep learning!";
    } else {
      return "Keep practicing! You'll get better!";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Main Results Card */}
        <Card className="bg-black/50 border-blue-500">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy size={80} className="text-yellow-400" />
            </div>
            <CardTitle className="text-3xl text-blue-400">
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-blue-300">
                  {percentage}%
                </div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#1e3a8a"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray={`${percentage * 2.83} ${
                    283 - percentage * 2.83
                  }`}
                  strokeDashoffset="70.75"
                />
              </svg>
            </div>

            <p className="text-xl text-blue-200 mb-4">
              You scored <span className="font-bold">{score}</span> out of{" "}
              <span className="font-bold">{total}</span>
            </p>

            <p className="text-lg text-blue-300 mb-4">{getFeedback()}</p>

            {percentage >= 80 && (
              <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="text-yellow-400" size={24} />
                  <span className="text-yellow-400 font-semibold">
                    Prize Winner!
                  </span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link href={`/quiz/${type}`} className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/20"
              >
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
        {/* Perfect Score Celebration */}
        {wrongAnswers.length === 0 && (
          <Card className="bg-black/50 border-green-500">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <CircleCheck size={60} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                Perfect Score!
              </h3>
              <p className="text-green-300">
                You answered all questions correctly. Outstanding performance!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
