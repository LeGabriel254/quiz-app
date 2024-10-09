'use client'
export default function Title({title_part1, title_part2}){
    return(
        <>
            <h2>{title_part1}</h2>
            <strong>{title_part2}</strong>
        </>
    )
}