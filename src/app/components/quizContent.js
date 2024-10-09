'use client'

import AnswersSection from "./answersSection";
import QuestionSection from "./questionSection";
import { useEffect, useState } from 'react';
import { useData } from '../DataContext';
import { useSearchParams } from 'next/navigation'
import ScoreDisplay from "./scoreDisplay";
import Title from "./title";


export default function QuizContent(){
    const data_result = useData();
    const searchParams = useSearchParams();
    const[result, setResult] = useState(null);

    useEffect(()=>{
        const bg_classes = {"HTML":"bg_html", "CSS":"bg_css", "JavaScript":"bg_js", "Accessibility":"bg_access"};
        if(data_result.data && searchParams.get('subject')){
            const filtered = data_result.data.filter((item)=>item.title === searchParams.get('subject')); 
            setResult(filtered[0] || null);
            data_result.setTopicLogo(filtered[0].icon);
            data_result.setTopicTitle(filtered[0].title);
            data_result.setTopicBgClass(bg_classes[filtered[0].title]);  
        }
    },[data_result, searchParams, result])
    if(result && data_result.counter > result.questions.length){
        return(
            <>
            <section>
                <Title title_part1="Quiz completed" title_part2="You scored..."/>
            </section>
            <article>
                <ScoreDisplay data_result={data_result}/>
            </article> 
            </>
        )
    }
    return(
        <>
            <section>
                <QuestionSection data={result} data_result={data_result}/>
            </section>
            <article>
                <AnswersSection data={result} data_result={data_result}/>
            </article>
        </>
    )
}