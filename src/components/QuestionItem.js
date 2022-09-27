import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateItem }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteQuestion(question))

   
  }
  
  function handleOptionChange(e){
      let index = e.target.value
       console.log(index)
    fetch(`http://localhost:4000/items/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: index,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem))
     }
        
    


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleOptionChange} >{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
