import './App.css';
import { Container, LoadMoreButton, NoPeopleTitle, PeopleContainer, PeopleItem, PeopleTitle, SpinnerContainer } from './style';
import { useCallback, useEffect } from 'react';
import { useRef } from 'react';
import Select from './modules/Select';
import { useState } from 'react';
import Spinner from './Spinner';

const PEOPLE_LIST_SIZE = 10
function App() {

  const planetCurrentPage = useRef(1)
  const peopleCurrentPage = useRef(1)
  const planetPeopleList = useRef([])
  const [planetList, setPlanetList] = useState([])
  const [peopleList, setPeopleList] = useState([])
  const [showError, setShowError] = useState(null)

  const [loader, setLoadder] = useState(false)



  const fetchPlantes = useCallback(async () => {

    try {
      const response = await fetch(`https://swapi.dev/api/planets/?page=${planetCurrentPage.current}`)
      if (response.ok) {
        const finalData = await response.json()
        setPlanetList((state) => [...state, ...finalData.results])
      } else {
        --planetCurrentPage.current
      }

    } catch (err) {
      --planetCurrentPage.current
    } finally {
      setLoadder(false)
    }

  }, [planetList])

  const fetchPeople = async (api) => {

    try {
      const response = await fetch(api)
      if (response.ok) {
        const finalData = await response.json()
        return finalData
      } else {
        return false
      }

    } catch (err) {
      return false
    } finally {
      setLoadder(false)
    }

  }

  useEffect(() => {
    fetchPlantes()
  }, [])

  const onLoadMore = () => {
    setLoadder(true)
    ++planetCurrentPage.current
    fetchPlantes()
  }

  const getPeople = async () => {
    setLoadder(true)
    let startIndex = PEOPLE_LIST_SIZE * (peopleCurrentPage.current - 1)
    let endIndex = startIndex + PEOPLE_LIST_SIZE

    console.log(planetPeopleList.current)
    let getPeopleApiList = planetPeopleList.current.slice(startIndex, endIndex)

    let getPeoplePromiseList = []
    for (let i in getPeopleApiList) {
      getPeoplePromiseList.push(fetchPeople(getPeopleApiList[i]))
    }

    try {
      let data = await Promise.all(getPeoplePromiseList)
      if (data) {
        ++peopleCurrentPage.current
        setPeopleList((state) => [...state, ...data])
      }

    } catch (err) {

    } finally {
      setLoadder(false)
    }

  }

  const onSetPlanet = async (planet) => {
    setShowError(null)
    setPeopleList([])
    peopleCurrentPage.current = 1
    planetPeopleList.current = planet.residents

    if (planetPeopleList.current.length > 0) {
      getPeople()
    } else {
      setShowError('No People Found')
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <div style={{ margin: '10px' }}>
            <Select
              label="Select Planet"
              values={planetList}
              onChange={onSetPlanet}
              onLoadMore={onLoadMore}
            />
          </div>
          <PeopleContainer>
            <PeopleTitle>{'People List'}</PeopleTitle>
            {showError && <NoPeopleTitle>{showError}</NoPeopleTitle>}
            {
              peopleList.length > 0 && <>
                {
                  peopleList.map((item, index) => {
                    return <PeopleItem>{item.name}</PeopleItem>
                  })
                }
                {
                  peopleList.length !== planetPeopleList.current.length && <LoadMoreButton onClick={getPeople}>Load More</LoadMoreButton>
                }
              </>
            }
          </PeopleContainer>
        </Container>
        {
          loader && <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
      </header>
    </div>
  );
}

export default App;
