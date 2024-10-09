import { Suspense } from "react";
import QuizContent from "../components/quizContent";

export default function Quiz(){
    return(
        <Suspense fallback={<h3>Loading quiz...</h3>}>
            <QuizContent/>
        </Suspense>
    )
}