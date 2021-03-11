import {useState, useEffect} from 'react';
import randomWords from 'random-words';
import SecretWord from './SecretWord';
import axios from 'axios';
import './App.css';

const languages = [
  {name: 'Spanish', val: 'es'},
  {name: 'German', val: 'de'},
  {name: 'Japanese', val: 'ja'},
  {name: 'French', val: 'fr'},
  {name: 'Korean', val: 'ko'},
  {name: 'Arabic', val: 'ar'},
  {name: 'Hindi', val: 'hi'},
  {name: 'Portuguese ', val: 'pt'},
  {name: 'Italian', val: 'it'}
];

function App() {
  const [words, setWords] = useState({english: [], translate: [], language:'es'});
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState({word: 0, letter: -1});

  const languagesButtons = languages.map(l => {
    return(
      <p 
        key={l.val} 
        className={`languages ${words.language === l.val && 'selected'}`} 
        value={l.val}
        onClick = {() => setWords({...words, language: l.val})}
      >
          {l.name}
      </p>
    );
  });

  useEffect(() => {
    document.addEventListener('keydown', handleInput);
    
    return () => document.removeEventListener('keydown', handleInput)
  });

  useEffect(()=>{
    if(isPlaying && index.letter > words.english[index.word].length -2){
      setIndex({letter: -1, word: index.word + 1});
      setScore(score + 1);
      setNewWords([randomWords()]);
    }
  },[index]);

  useEffect(() =>{
    let interval = null;
    if (timer > 0 && isPlaying){
      interval = setInterval(() =>{
        setTimer(timer - 1);
      }, 1000);
    }
    else if (timer <= 0){
      clearInterval(interval);
      gameOver();
    }

    return () => clearInterval(interval);
  },[timer,isPlaying])

  const handleInput = (event) => {
    event.preventDefault();
    const myKey = event.key;
    if(myKey.toLowerCase() === words.english[index.word].charAt(index.letter + 1).toLowerCase()){
      setIndex({...index, letter: index.letter + 1});
    }
    if(event.keyCode === 13 && isPlaying){
      setIndex({letter: -1, word: index.word + 1});
      setNewWords([randomWords()]);
    }
  }

  const setNewWords = async (newWords, newGame = false) =>{
    const translatedWords = await Promise.all(newWords.map(async (word) => doTranslation(word)));
    if(newGame) {
      setWords({...words, english: newWords, translate: translatedWords}) 
    }
    else{
      setWords({...words, english: [...words.english, ...newWords], translate: [...words.translate, ...translatedWords]});
    } 
  }

  const startNewGame = () => {
    if(!isPlaying){
      setScore(0);
      setTimer(30);
      setIsPlaying(true);
      setNewWords(randomWords(3), true);
    }
  }

  const doTranslation = async (text) =>{
    const { data } = await axios.post(
      'https://translation.googleapis.com/language/translate/v2',
      {},
      {
        params: {
          q: text,
          target: words.language,
          key: 'AIzaSyB0onalK_uzODJVw_nZ5OEVrRfyKxPQ0oc'
        }
      }
    );
    return data.data.translations[0].translatedText
  }

  const gameOver = () => {
    setIsPlaying(false);
    setIndex({word: 0, letter: -1});
  }


  return (
    <div className="App">
      <h3 className='title'>Typing game by Carlitos</h3>
      <p className='subtitle'>Translate the words into English, type as many as you can before running out of time. Press enter to skip a word.</p>
      <div className="language-list">
        {languagesButtons}
      </div>
      <button disabled={isPlaying} className='btn btn-start' onClick={() => startNewGame()}>Start game</button>
      <div className='stats-container'>
        <p className='stats subtitle'>Score: <br/>{score}</p>
        <p className='stats subtitle'>Time left: <br/>{timer}</p>
      </div>

      <div className={isPlaying ? '':'hidden'}>
        <p className='word'>{words.translate[index.word]}</p>
        <SecretWord word={words.english[index.word]} index={index}/>
      </div>
      
    </div>
  );
}

export default App;
