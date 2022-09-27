import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
 
const [question, setQuestion] = useState([]);

  useEffect(() => {
     fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((question) => setQuestion(question));
  }, []);

  function handleDelete(deletedItem) {
   
   const updatedItems = question.filter((item) => item.id !== deletedItem.id);
    setQuestion(updatedItems);
  }
   
  function handleUpdateItem(updatedItem) {
         const updatedItems = question.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setQuestion(updatedItems);
  }
 const displayQuestions = question.map((item) => (
  <QuestionItem key={item.id} question={item} 
  onDeleteQuestion={handleDelete}
  onUpdateItem={handleUpdateItem}
   />
))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
