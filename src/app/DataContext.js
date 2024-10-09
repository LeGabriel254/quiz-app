'use client'
import { createContext, useContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [counter, setCounter] = useState(1);
    const [score, setScore] = useState(0);
    const [topicLogo, setTopicLogo] = useState('');
    const [topicTitle, setTopicTitle] = useState('');
    const [topicBgClass, setTopicBgClass] = useState('');
    const [loading, setLoading] =  useState(false)


    // Function to Fetch questions from data.json when the component mounts
    useEffect(() => {
        async function fetchData( ) {
          setLoading(true)
          try {
            const response = await fetch("/data/data.json"); 
            const jsonData = await response.json()          
            setData(jsonData.quizzes)
          } catch (error) {
            throw new Error(error)
          } finally {
            setLoading(false)
          }
        } 
        fetchData()
      }, [])
        
    return (
        <DataContext.Provider value={{
            data,
            counter, setCounter,
            score, setScore,
            topicLogo, setTopicLogo,
            topicTitle, setTopicTitle,
            topicBgClass, setTopicBgClass
        }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    return useContext(DataContext)
}