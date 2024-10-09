'use client'

import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../DataContext';
import Image from "next/image";
import Link from "next/link";


export default function SubjectsLinks(){
    const data = useContext(DataContext);
    useEffect(()=>{
        if(data){
            data.setCounter(1);
            data.setScore(0);
        }
        const storage_value = localStorage.getItem('isDark');
        const isDark = storage_value === "true";
        if(isDark){         
            document.querySelectorAll(".subjects").forEach((el)=>{
                el.classList.add('disable_box_shadow');
            })
        }
    },[data])                       
    return(
        <>
            <Link href={{ pathname:'/questions', query:{ subject:'HTML'}}} className="subjects" >
                <Image src="/images/icon-html.svg" alt="html icon" className="bg_html"  width={40} height={40}/> HTML
            </Link>
            <Link href={{ pathname:'/questions', query:{ subject:'CSS'}}} className="subjects">
                <Image src="/images/icon-css.svg" alt="css icon" className="bg_css"  width={40} height={40} /> CSS
            </Link>
            <Link href={{ pathname:'/questions', query:{ subject:'JavaScript'}}} className="subjects">
                <Image src="/images/icon-js.svg" alt="js icon" className="bg_js"  width={40} height={40} /> Javascript
            </Link>
            <Link href={{ pathname:'/questions', query:{ subject:'Accessibility'}}} className="subjects">
                <Image src="/images/icon-accessibility.svg" alt="accessibility icon" className="bg_access" width={40} height={40}/> Accessibility
            </Link>
        </>
    )
}