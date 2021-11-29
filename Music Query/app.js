const songInput = document.querySelector('#song-input');
const searchBtn = document.querySelector('#search-btn');
const result = document.querySelector('#results');
const artistRow = document.querySelector('#artist-row');
const headingDiv = document.querySelector('#art-row');

const getkeys = async () => {
    const term = songInput.value;
    const config = { headers: { 'x-rapidapi-host': 'shazam.p.rapidapi.com', 'x-rapidapi-key': '5238118c74msh66c8fe0ee13c8bbp12c092jsn83e198340447' } }
    const res = await axios.get(`https://shazam.p.rapidapi.com/search?term=${term}&locale=en-US`, config);
    const datas = res.data.tracks.hits;
    const keys = datas.map((e) => {
        return e.track.key;
    })
    songInput.value = '';
    artistRow.innerHTML = '';
    headingDiv.innerHTML = '';
    setTimeout(function () {
        const headDiv = document.createElement('div');
        headDiv.setAttribute('class', 'col-12');
        const head = document.createElement('h4');
        head.textContent = 'Artist';
        const line = document.createElement('hr');
        headDiv.append(head);
        headDiv.append(line);
        headingDiv.append(headDiv);
        const artists = res.data.artists.hits;
        for (let art of artists) {
            const div = document.createElement('div');
            div.setAttribute('class', 'artists text-center');
            const img = document.createElement('img');
            if (art.artist.avatar) {
                img.setAttribute('src', `${art.artist.avatar}`);
            }
            else {
                img.setAttribute('src', `https://homestaymatch.com/images/no-image-available.png`);
            }
            div.appendChild(img);
            const anchor = document.createElement('a');
            anchor.setAttribute('href', `${art.artist.weburl}`);
            anchor.setAttribute('alt', `${art.artist.name}`);
            const para = document.createElement('p');
            para.innerText = `${art.artist.name}`;
            anchor.appendChild(para);
            div.appendChild(anchor);
            artistRow.appendChild(div);
        }
    }, 4000)

    return keys;
}

const songDetails = async (e) => {
    e.preventDefault();
    const keyID = await getkeys();
    result.innerHTML = '';
    for (let i = 0; i < keyID.length; i++) {
        const head = { headers: { 'x-rapidapi-host': 'shazam.p.rapidapi.com', 'x-rapidapi-key': '5238118c74msh66c8fe0ee13c8bbp12c092jsn83e198340447' } }
        const res = await axios.get(`https://shazam.p.rapidapi.com/songs/get-details?key=${keyID[i]}&locale=en-US`, head);
        const tracks = res.data;
        const div = document.createElement('div');
        div.setAttribute('class', 'image');
        div.style.backgroundImage = `url('${tracks.images.coverart}')`;
        const title = document.createElement('p');
        div.appendChild(title);
        title.setAttribute('class', 'song-title');
        title.textContent = `${tracks.title}`
        const artist = document.createElement('p');
        artist.setAttribute('class', 'artist-name');
        artist.textContent = `${tracks.subtitle}`
        div.appendChild(artist);
        const songLink = document.createElement('a');
        songLink.setAttribute('href', `${tracks.url}`)
        songLink.setAttribute('id', 'img-link');
        songLink.appendChild(div);
        result.appendChild(songLink);
    }

}

const createArtist = () => {
    const keys = getkeys();
    const artLoop = keys.map(function (e) {
        console.log(e);
    })
}

searchBtn.addEventListener('click', songDetails);