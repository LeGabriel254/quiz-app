'use client'

import Image from 'next/image';
import { useEffect } from 'react';

export default function ThemeSwitcher(){

    useEffect(()=>{
        const storage_value = localStorage.getItem('isDark');
        const isDark = storage_value === "true";
        if(isDark){
            document.querySelector("#theme").checked = true;
            document.querySelector("#theme").classList.add("moveRight");
            switchToDarkMode();
        }
    },[])

    const switchToDarkMode = () => {
        const root = document.documentElement;
        root.style.setProperty('--bg-mobile-mode', 'url("/images/pattern-background-mobile-dark.svg")');
        root.style.setProperty('--bg-tablet-mode', 'url("/images/pattern-background-tablet-dark.svg")');
        root.style.setProperty('--bg-desktop-mode', 'url("/images/pattern-background-desktop-dark.svg")');
        root.style.setProperty('--light-grey', '#313E51');
        root.style.setProperty('--dark-navy', '#FFFFFF');
        root.style.setProperty('--pure-white', '#3B4D66');
        root.style.setProperty('--grey-navy', '#ABC1E1');
        root.style.setProperty('--error', '#fff');
        document.querySelectorAll(".sunmoonIcons")[0].src = "/images/icon-sun-light.svg";
        document.querySelectorAll(".sunmoonIcons")[1].src = "/images/icon-moon-light.svg";
        document.querySelectorAll(".subjects, .answers").forEach((el)=>{
            el.classList.add('disable_box_shadow');
        })

    }

    const switchToLightMode = () => {
        const root = document.documentElement;
        root.style.setProperty('--bg-mobile-mode', 'url("/images/pattern-background-mobile-light.svg")');
        root.style.setProperty('--bg-tablet-mode', 'url("/images/pattern-background-tablet-light.svg")');
        root.style.setProperty('--bg-desktop-mode', 'url("/images/pattern-background-desktop-light.svg")');
        root.style.setProperty('--light-grey', '#F4F6FA');
        root.style.setProperty('--dark-navy', '#313E51');
        root.style.setProperty('--pure-white', '#FFFFFF');
        root.style.setProperty('--grey-navy', '#626C7F');
        root.style.setProperty('--error', '#EE5454');
        document.querySelectorAll(".sunmoonIcons")[0].src = "/images/icon-sun-dark.svg";
        document.querySelectorAll(".sunmoonIcons")[1].src = "/images/icon-moon-dark.svg";
        document.querySelectorAll(".subjects, .answers").forEach((el)=>{
            el.classList.remove('disable_box_shadow');
        })
    }

    const switchDarkLight = ()=>{
        const themeIcon = document.querySelector("#theme");
        if(themeIcon.checked){
            localStorage.setItem('isDark', true)
            themeIcon.classList.add("moveRight");
            switchToDarkMode();
        }else{
            localStorage.setItem('isDark', false)
            themeIcon.classList.remove("moveRight");
            switchToLightMode();
        }  
    }

    return(
        <div className='theme_switcher_container'>
            <Image src="/images/icon-sun-dark.svg" className="sunmoonIcons" alt="sun icon" width={24} height={24}/>
            <label htmlFor='theme' className='checkbox_label'>switcher</label>
            <input type="checkbox" name="theme" className="themeIcon" id="theme" onChange={switchDarkLight}/>
            <Image src="/images/icon-moon-dark.svg" className="sunmoonIcons" alt="moon icon" width={24} height={24}/>
        </div>
    )
}