import { useEffect, useState } from "react";

export default function Meme(){



    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    });

    function textChange(event){
        const {name, value} = event.target;
        return setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    const [allMeme, setAllMeme] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(dataBase => setAllMeme(dataBase.data.memes))
    }, [])

    function randomMeme(){
        const randomGetMeme = Math.floor(Math.random() * allMeme.length);
        const url = allMeme[randomGetMeme].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    }
  
    

    return(
        <div className="form">
            <div>
                <div className="user-input">
                    <input className="input1" placeholder="Top text" name="topText" value={meme.topText} onChange={textChange} type="text"/>
                    <input className="input2" placeholder="bottom text" name="bottomText" value={meme.bottomText} onChange={textChange} type="text"/>
                </div>
                <button onClick={randomMeme} className="btn">Get a new meme image <img src="https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png" alt=""/></button>
                <div className="memeContainer">
                    <img className="memeImg" src={meme.randomImage} alt=""/>
                    <h2 className="memeTopText">
                        {meme.topText}
                    </h2>
                    <h2 className="memeBottomText">
                        {meme.bottomText}
                    </h2>
                </div>
            </div>
        </div>
    )
}
