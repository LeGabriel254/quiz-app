'use client'

import Image from "next/image";
import { useEffect } from "react";

export default function AnswersSection({ data, data_result }) {
    const letters = ["A", "B", "C", "D"];

    // CSS class names for different label states (active, correct, incorrect)
    const label_classes = ["active", "correct_answer_label", "incorrect_answer_label"];
    const span_classes = ["active_letter", "correct_answer_span", "incorrect_answer_span"];

    // Hook to apply styles based on dark mode setting
    useEffect(() => {
        const storage_value = localStorage.getItem('isDark');
        const isDark = storage_value === "true";

         // If dark mode is enabled, remove box shadows from answers
        if (isDark) {
            document.querySelectorAll(".answers").forEach((el) => {
                el.classList.add('disable_box_shadow');
            })
        }
    })

      // Function to remove specific classes from answer options and letters
    const removeStyleFromOptions = (answer_classes, opt_letter_classes) => {
        const answers = document.querySelectorAll(".answers");
        const option_letters = document.querySelectorAll(".option_letter");

        answers.forEach((element) => element.classList.remove(...answer_classes));
        option_letters.forEach((element) => element.classList.remove(...opt_letter_classes));
    }


    
    // Function to add specific classes to selected answer option and letter
    const addStyleToOptions = (opt_parent_class, opt_sibling_class) => {
        const checked_option = document.querySelector("input[type='radio']:checked");
        checked_option.parentElement.classList.add(opt_parent_class);
        checked_option.nextElementSibling.classList.add(opt_sibling_class);
    }

    const styleOption = (answer_classes, opt_letter_classes, opt_parent_class, opt_sibling_class) => {
        removeStyleFromOptions(answer_classes, opt_letter_classes);
        addStyleToOptions(opt_parent_class, opt_sibling_class)
    }

       // Handle styling when an answer is checked (show active style)

    const handleStyleOnCheck = () => {
        document.querySelector(".error_message").style.display = 'none';
        styleOption(["active"], ["active_letter"], "active", "active_letter");
    }

    // Function to toggle visibility of the correct/incorrect icon based on answer correctness

    const toggleDisplayForCorrectIncorrectIcon = (isAnswerCorrect) => {
        const correct_icons = document.querySelectorAll(".correct_Incorrect_Icon");
        const checked_option_icon = document.querySelector("input[type='radio']:checked ~ .correct_Incorrect_Icon");

        // Function to toggle visibility of the correct/incorrect icon based on answer correctness
        if (isAnswerCorrect) {
            correct_icons.forEach((icon) => icon.src = "/images/icon-correct.svg");
        } else {
            correct_icons.forEach((icon) => icon.src = "/images/icon-incorrect.svg");
        }
        correct_icons.forEach((icon) => icon.style.visibility = "hidden");
        if (checked_option_icon) checked_option_icon.style.visibility = "visible";
    }

    const checkSubmittedResponse = () => {
        const checked_option = document.querySelector("input[type='radio']:checked").value;
        const selected_answer = data.questions[data_result.counter - 1].options[letters.indexOf(checked_option)];
        const correct_answer = data.questions[data_result.counter - 1].answer;
        if (selected_answer.trim() === correct_answer.trim()) {
            return true;
        }
        return false
    }

    const markCorrectAnswer = () => {
        const correct_answer = data.questions[data_result.counter - 1].answer;
        document.querySelectorAll(".answers").forEach((el) => {
            if (el.textContent.slice(1).trim() === correct_answer) {
                el.lastChild.src = '/images/icon-correct.svg';
                el.lastChild.style.visibility = 'visible';
            }
        })
    }

    const stopSelectingOptions = () => {
        document.querySelectorAll('.radios').forEach((el) => {
            el.disabled = true;
        })
    }
    const resumeSelectingOptions = () => {
        document.querySelectorAll('.radios').forEach((el) => {
            el.disabled = false;
        })
    }

    const onSubmitOption = () => {
        const checked_option = document.querySelector("input[type='radio']:checked");
        if (checked_option) {
            stopSelectingOptions();
            const isAnswerCorrect = checkSubmittedResponse();
            if (isAnswerCorrect) {
                styleOption(label_classes, span_classes, "correct_answer_label", "correct_answer_span");
                toggleDisplayForCorrectIncorrectIcon(isAnswerCorrect);
                data_result.setScore(data_result.score + 1);
            } else {
                styleOption(label_classes, span_classes, "incorrect_answer_label", "incorrect_answer_span");
                toggleDisplayForCorrectIncorrectIcon(isAnswerCorrect);
                markCorrectAnswer();
            }
            document.querySelector(".submit_answer").style.display = 'none';
            document.querySelector(".next_question").style.display = 'block';
        } else {
            document.querySelector(".error_message").style.display = 'flex';
            document.querySelector(".error_message").scrollIntoView({ behavior: 'smooth' });
        }
    }

    const nextQuestion = () => {
        data_result.setCounter(data_result.counter + 1);
        document.querySelectorAll(".radios").forEach((element) => {
            element.checked = false;
        })
        removeStyleFromOptions(label_classes, span_classes);
        toggleDisplayForCorrectIncorrectIcon(false);
        document.querySelector(".submit_answer").style.display = 'block';
        document.querySelector(".next_question").style.display = 'none';
        resumeSelectingOptions();
    }

    useEffect(() => {
        document.querySelectorAll('.answers').forEach((el) => {
            el.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                }
            });
        });
    }, []); // Empty dependency array ensures this runs only once after mounting



    if (data && data_result) {
        return (
            <>
                {data.questions[data_result.counter - 1].options.map((value, index) => (
                    <label tabIndex="0" htmlFor={`answer_${letters[index]}`} className="answers" key={index}>
                        <input type="radio" className="radios" id={`answer_${letters[index]}`} name="answer" value={letters[index]} onChange={handleStyleOnCheck} />
                        <span className="option_letter">{letters[index]}</span>
                        {value}
                        <Image src="/images/icon-correct.svg" alt="correct icon" className="correct_Incorrect_Icon" width={40} height={40} />
                    </label>
                ))}
                <button className="submit_answer" onClick={onSubmitOption}>Submit Answer</button>
                <button className="next_question" onClick={nextQuestion}>Next Question</button>
                <div className="error_message">
                    <Image src="/images/icon-incorrect.svg" alt="correct icon" className="error_icon" width={40} height={40} />
                    <span className="error_text">Please select an answer</span>
                </div>
            </>
        )
    } else {
        return (
            <h3>Loading options ...</h3>
        )
    }

}