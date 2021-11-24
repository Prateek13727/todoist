import React from 'react';

const Link = ({
  active, 
  onClick, 
  children
}) => {
if(active){
  return <span>{children}</span>
}
return <button onClick={(e) => {
      e.preventDefault();
      onClick();
  }}>
  {children}
</button> 
}

export default Link