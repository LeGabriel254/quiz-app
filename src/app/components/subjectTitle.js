'use client'
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SubjectTitle({icon_url, title, bg_class }){
    const searchParams = useSearchParams();

    useEffect(()=>{
        if(searchParams.get('subject')){
            document.querySelectorAll(".subject_title_container").forEach((item)=>{
                item.classList.add("visible");
            })
            
        }else{
            document.querySelectorAll(".subject_title_container").forEach((item)=>{
                item.classList.remove("visible");
            })
        }
    },[searchParams])

    return (
        <div className='subject_title_container'>
            <Image src={icon_url ? icon_url : '/images/icon-html.svg'} className= {`header_subject_icon ${ bg_class ? bg_class : ''}`} alt="topic icon" width={40} height={40}/>
            <h1 className='header_subject_title'>{title ? title : 'Subject'}</h1>
        </div>
    )
}