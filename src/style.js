import styled from 'styled-components';

export const Container = styled.div`
font-size: 1.5em;
text-align: center;
color: palevioletred;
display: flex;
flex-direction: column;
align-items: flex-start;
padding:10px;
`;

export const PeopleContainer=styled.div`
display: flex;
flex-direction: column;
/* justify-content: flex-start; */
align-items: flex-start;
padding: 20px;
background: white;
border-radius: 10px;
overflow: scroll;
max-height: 500px;
`
export const PeopleItem=styled.div`
 flex:1;
 font-size: 18px;
 color: #525151;
 padding: 6px 6px 6px 0px;
 `
 export const PeopleTitle=styled.h3`
 margin: 0;
 font-size: 20px;
 color: #5c5a5a;
 margin-bottom:10px;
 `

 export const NoPeopleTitle=styled.h3`
 margin: 0;
 font-size: 24px;
 color: #5c5a5a;
 margin-bottom:10px;
 
 `

 export const LoadMoreButton = styled.button`
  padding: 0.3rem 0.5rem;
  min-width: 7rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  color: #111;
  align-items: center;
  justify-content: space-between;
  border: 1px solid slategrey;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 #ccc;
  transition: 0.3s ease;
  &:hover {
    background-color: #eee;
  }
`;

export const SpinnerContainer = styled.div`
position: absolute;
width: 100%;
height: 100%;
align-items: center;
/* align-content: center; */
display: flex;
justify-content: center;
background: #000000c7;
`