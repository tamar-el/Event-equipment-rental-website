// import React from 'react';
// import './Card.css'
// const OneTrampoline =(props) => {
//    let item=props.oneTrampoline
//     return (
//     <>
//       <img src={item.image}  style={{ width: '70%', height: 'auto', borderRadius: '5px 5px 0 0' }} />
//       <h1> name:{item.name}</h1>
//       <p>price:{item.pricePerHour}</p>
//       <p>description:{item.describtion}</p>
//       <p>category:{item.category}</p>
     
//     </>
//       );
// }
 
// export default OneTrampoline;

const OneTrampoline = (props) => {
  const item = props.oneTrampoline;
  return (
    <div className="trampoline-card">
      <img className="trampoline-image" src={item.image} alt={item.name} />
      <div className="trampoline-content">
        <h2 className="trampoline-title">{item.name}</h2>
        <p className="trampoline-description">{item.description}</p>
        <div className="trampoline-info">
          <span className="trampoline-category">Category: {item.category}</span>
          <span className="trampoline-price">{item.pricePerHour}₪/hour</span>
        </div>
      </div>
    </div>
  );
};

export default OneTrampoline;