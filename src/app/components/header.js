'use client'

import { useData } from '../DataContext';
import ThemeSwitcher from "./themeSwitcher";
import SubjectTitle from './subjectTitle';
import { Suspense } from 'react';

export default function Header() {
  const data_result = useData();
  //to check whether data is loaded
  if (data_result) {
    return (
      <header>
        <Suspense fallback={<h3>Loading ...</h3>}>
          <SubjectTitle icon_url={data_result.topicLogo} title={data_result.topicTitle} bg_class={data_result.topicBgClass} />
        </Suspense>
        <ThemeSwitcher />
      </header>
    )
  } else {

    return (
      <h3>Loading ...</h3> //if the data hasn't load yet
    )
  }
}