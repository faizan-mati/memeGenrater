"use client"

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MemeDetail({ params }) {
    const [text, setText] = useState('');
    const [text1, setText1] = useState('');
    const [selectedMeme, setSelectedMeme] = useState(null);
    const [screen, setScreen] = useState(null);

    useEffect(() => {
        const fetchMemes = async () => {
            const res = await fetch(`https://api.imgflip.com/get_memes`);
            const data = await res.json();
            const memes = data.data.memes;
            const memeId = params.memedetail;
            const selectedMemeData = memes.find(m => m.id === memeId);
            setSelectedMeme(selectedMemeData);
        };

        fetchMemes();
    }, [params.memedetail]);

    const handleGenerateMeme = async () => {
        const username = "faizanMati"; // Replace with your Imgflip username
        const password = "ali098765"; // Replace with your Imgflip password

        const url = `https://api.imgflip.com/caption_image?template_id=${selectedMeme.id}&username=${username}&password=${password}&text0=${text}&text1=${text1}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
                setScreen(data.data.url);
            }
        } catch (error) {
            console.error("Error generating meme:", error);
        }
    };

    const openGeneratedMeme = () => {
        window.open(screen, '_blank');
    };

    return (
        <div className="container">
            {selectedMeme && (
                <div className="row my-5">
                    <div className="col-md-4 col-lg-4 col-sm-12">
                        <div className="image-container" style={{ height: '500px', overflow: 'hidden' }}>
                            <img src={selectedMeme.url} alt={selectedMeme.name} className="img-fluid" style={{ objectFit: 'fit', width: '100%', height: '100%' }} />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12 mt-5">
                        <h2>{selectedMeme.name}</h2>
                        <input type='text' placeholder='Text One' onChange={(e) => setText(e.target.value)} className='form-control' />
                        <input type='text' placeholder='Text two' onChange={(e) => setText1(e.target.value)} className='form-control my-3' />
                        <button type='submit' className='btn btn-primary' onClick={handleGenerateMeme}> Generate </button>
                        {screen && (
                            <button type='button' className='btn btn-secondary mx-3 ml-3' onClick={openGeneratedMeme}> Open Generated Meme </button>
                        )}
                    </div>
                </div>
            )}
         
        </div>
    );
}
