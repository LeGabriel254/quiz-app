'use client'

import { useEffect} from 'react';

export default function QuestionSection({data, data_result}){
    useEffect(()=>{
        if(data && data_result){
            document.documentElement.style.setProperty('--range_status', `${data_result ? data_result.counter*10 : 0}%`);
        }
    },[data,data_result])

    if(data && data_result){
        return(
            <>
                <p>Question {data_result.counter} of {data.questions.length}</p>
                <h3>{data.questions[data_result.counter-1].question}</h3>
                <label htmlFor='progress' className='progress_label'>progress</label>
                <input id='progress' tabIndex="-1" type="range" className='range_status' min={1} max={10} value={data_result.counter} readOnly/>
            </>
        )
    }else{
        return(
            <h3>Loading question ...</h3>
        )
    }
}