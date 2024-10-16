'use client'

import AnswersSection from "./answersSection";
import QuestionSection from "./questionSection";
import { useEffect, useState } from 'react';
import { useData } from '../DataContext';
import { useSearchParams } from 'next/navigation'
import ScoreDisplay from "./scoreDisplay";
import Title from "./title";


export default function QuizContent() {
    const data_result = useData();
    const searchParams = useSearchParams(); // Retrieve query parameters from the URL
    const [result, setResult] = useState(null);

    // useEffect runs when data_result or searchParams change
    useEffect(() => {
        // Define a mapping between subjects and corresponding background CSS classes
        const bg_classes = { "HTML": "bg_html", "CSS": "bg_css", "JavaScript": "bg_js", "Accessibility": "bg_access" };


        // Check if quiz data and subject parameter from the URL are available
        if (data_result.data && searchParams.get('subject')) {
            // Filter the data to find the quiz for the selected subject
            const filtered = data_result.data.filter((item) => item.title === searchParams.get('subject'));

            // Update the result state with the filtered quiz data
            setResult(filtered[0] || null);

            data_result.setTopicLogo(filtered[0].icon);
            data_result.setTopicTitle(filtered[0].title);
            data_result.setTopicBgClass(bg_classes[filtered[0].title]);
        }
    }, [data_result, searchParams, result])
    // Check if the user has answered all questions in the quiz
    if (result && data_result.counter > result.questions.length) {
        // If the quiz is completed, show the quiz completion screen and the user's score
        return (
            <>
                <section>
                    <Title title_part1="Quiz completed" title_part2="You scored..." />
                </section>
                <article>
                    <ScoreDisplay data_result={data_result} />
                </article>
            </>
        )
    }
    // If the quiz is not completed, show the question and answer sections
    return (
        <>
            <section>
                <QuestionSection data={result} data_result={data_result} />
            </section>
            <article>
                <AnswersSection data={result} data_result={data_result} />
            </article>
        </>
    )
}