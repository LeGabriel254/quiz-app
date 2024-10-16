'use client'
import { Suspense } from "react";
import SubjectTitle from "./subjectTitle";
import { useRouter } from 'next/navigation'

export default function ScoreDisplay({ data_result }) {
    const router = useRouter()
    const playAgain = () => {
        router.push('/');
    }

    return (
        <>
            <div className="score_container">
                <Suspense fallback={<Loading />}>
                    <SubjectTitle icon_url={data_result.topicLogo} title={data_result.topicTitle} bg_class={data_result.topicBgClass} />
                </Suspense>
                <h4 className="score">{data_result.score ? data_result.score : 0}</h4>
                <span className="score_msg">out of 10</span>
            </div>
            <button className="play_again_btn" onClick={playAgain}>Play Again</button>
        </>
    )
}

const Loading = () => {
    <div><h3>Loading...</h3></div>
}