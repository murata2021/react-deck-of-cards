import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import Card from './Card'


const Cards=()=>{

    const INITIAL_URL='http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    const [cardList,setCardList]=useState([])

    const cardDeck=useRef();

    const isDone=()=>cardDeck.current.data.remaining===0?true:false

    const [url,setUrl]=useState(INITIAL_URL)

    const [launch,setLaunch]=useState(false)

    const start=async ()=>{
        cardDeck.current=await axios.get(url)
        let deckId=cardDeck.current.data.deck_id
        setUrl(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        setLaunch(true)
    }

    const drawACard=async ()=>{

        if (isDone()){
           alert('No cards remaining!')
        }
        else {
            let pickedCard=await axios.get(url)
            cardDeck.current={...pickedCard}
            pickedCard.data.rotation=Math.floor(Math.random() * 60)+30
            setCardList(cards=>[...cards,pickedCard.data])

        }
        
    }

    // useEffect(()=>{
    //     async function pickACard(){
    //         let pickedCard=await axios.get(url)

    //         console.log(pickedCard)
    //         // setProfile(res.data)
    //     }
    //     pickACard()
    //     console.log(cardDeck)

    // },[cardList])

    const restart= async()=>{
        setCardList(cards=>[])
        cardDeck.current=await axios.get(INITIAL_URL)
        let deckId=cardDeck.current.data.deck_id
        setUrl(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    }

    const handleClick=()=>{
        drawACard()

    }
   

    console.log('**********************')
    console.log(cardDeck.current)
    console.log(cardDeck.current?console.log(cardDeck.current.data.remaining):cardDeck.current)
    console.log('**********************')

    return (
        <div>
            <div className='container mt-2'>
                <div className='row justify-content-md-center'>
                    <div className="col-md-auto">
                        {!launch && <button className='btn btn-secondary' onClick={start}>Start</button>}
                        {launch && <button className='btn btn-secondary' onClick={handleClick}>Gimme a Card!</button>}
                        {launch&&<button className='btn btn-secondary' onClick={restart}>Restart</button>}
                    </div> 
                </div>
            </div>

            
            <div className='container mt-5'>
                <div className='col-md-auto' id='cards'>
                    {cardList.map(el=><Card key={el.cards[0].code} pic={el.cards[0].image} rotation={el.rotation}/>)}
                </div>
            </div>
        </div>
    )

}

export default Cards;