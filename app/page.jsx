import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-400 mb-6">
          CSI Open-Day Quiz Event
        </h1>
        <p className="text-lg md:text-xl text-blue-200 mb-12">
          Test your knowledge with our tech and non-tech quizzes!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Card className="bg-black/50 border-blue-500 hover:bg-black/70 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">
                Tech Quiz
              </CardTitle>
              <CardDescription className="text-blue-300">
                Test your technical knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Challenge yourself with questions about programming, hardware,
                software, and more tech topics.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/quiz/tech" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Tech Quiz
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-black/50 border-blue-500 hover:bg-black/70 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">
                Non-Tech Quiz
              </CardTitle>
              <CardDescription className="text-blue-300">
                Test your general knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Challenge yourself with questions about general knowledge,
                trivia, and other non-technical topics.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/quiz/non-tech" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Non-Tech Quiz
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
