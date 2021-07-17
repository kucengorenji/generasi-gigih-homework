import React from 'react';
import data from '../data/data';
import CardDetail from '../components/CardDetail';
import CardImage from '../components/CardImage';

export default function PlaylistCard() {
    const playlist = data.map((e) => {
        return (
            <div key={e.id}>
                <CardImage image={e.album.images[0].url} />
                <CardDetail 
                    title={e.name}
                    artist={e.artists[0].name}
					album={e.album.name}
                />
                <button>Select</button>
            </div>
        )
    })

    return(
        <div>
            {playlist}
        </div>
        
    )
}