import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GEO_API_URL, geoAPIOptions } from '../api';

const Search = ({onSearchChange}) => {

  const [cities, setCities] = useState([]);
  const [text, setText] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // laod city array from api 
  useEffect(() => {
    const loadCities = async () => {
      // if 'text' is empty do not run;
      if (text === '' || text === selectedCity) return
      const response_fetch = await fetch(
        `${GEO_API_URL}/cities?namePrefix=${text}`,
        geoAPIOptions
      )
      const response = await response_fetch.json();
      if(response.data && response.data.length){
        response.data = response.data.filter(r=> r.type ==='CITY');
        setCities(response.data);
      }
    }
    loadCities();
  }, [text,selectedCity]);

  const onChangeHandler = (e) => {
    setText(e.target.value)
  }

  const onSuggestionHandler = (city) =>{
    setText(city.name);
    setSelectedCity(city.name);
    setCities([]); 
    onSearchChange(city);
  };

  return (
    <InputContainer>
      <SearchInput placeholder="Search City" onChange={onChangeHandler} value={text} onBlur={()=>{
        setTimeout(()=>{
          setCities([]);
          setText('');
          setSelectedCity('');
        },200)
      }}/>
      <SuggetionWraper>
        {cities && cities.map((city,cityIndex) => {
          return <Suggestion key={cityIndex} onClick={()=>onSuggestionHandler(city)}>{city.name}</Suggestion>
        })}
      </SuggetionWraper>
    </InputContainer>
  )
};

const InputContainer = styled.div`
  margin: 2rem 2rem;
  text-align: center;
`;
const SearchInput = styled.input`
  width: 50%;
  height: 2em;
  border-radius: 15px;
  padding: 1em;
  text-align: center;
  font-weight: 600;
  border: 2px solid #f7f7f7;
  &:focus-visible{
    outline-color:#abd5f9;
    outline-width: 0;
  };
  color: #000;
  box-shadow: 2px 2px 4px 2px rgb(97 123 139 / 50%);
`;
const SuggetionWraper = styled.div`
  width: 50%;
  
  margin: 10px auto;
  border-radius: 20px;
background-color: #fff;
margin-bottom: 5px;
/* box-shadow: 2px 2px 4px 2px rgb(97 123 139 / 50%); */
  
`;
const Suggestion = styled.div`
width: 100%;
padding: 5px;
font-weight: 600;
text-transform: capitalize;
color: #000000;
/* border-radius: 20px;
background-color: #fff;
margin-bottom: 5px;
box-shadow: 2px 2px 4px 2px rgb(97 123 139 / 50%); */
cursor: pointer;
border-bottom:1px solid #d5d5d5;
&:hover{
  background-color: #d5d5d5;
  &:first-child{
    border-radius: 20px 20px 0 0;
  };
  &:last-child{
    border-radius: 0 0 20px 20px ;
  }
}
&:last-child {
  border-bottom:none
    }
`;

export default Search;