import { createSignal } from "solid-js";
import "./MapelCard.css";
import Picture from "../img/Picture.svg";
import Toga from "../img/Toga_Icon.svg";

function Card({ title, progress, imgSrc }) {
    return (
        <div class="cardnew">
            <img src={imgSrc} alt={title} class="card-image" />
            <div class="card-content">
                <div class="header">
                    <img src={Toga} alt="icon" class="header-icon" /> Muatan Nasional </div>
                <div class="title">{title}</div>
                <div class="progressBarContainer">
                    <div class="progressBar" style={{ width: '${progress}%' }} />
                </div>
                <div class="progressText">{progress}% Diselesaikan</div>
            </div>
        </div>
    );
}

function App() {
    const [cards] = createSignal([

        {
            title: "XII - MATEMATIKA",
            progress: 18,
            imgSrc: Picture, // Menggunakan SVG yang diimpor
        },
        {
            title: "XII - FISIKA",
            progress: 30,
            imgSrc: Picture, // Menggunakan SVG yang diimpor
        },
        {
            title: "XII - KIMIA",
            progress: 50,
            imgSrc: Picture, // Menggunakan SVG yang diimpor
        },
        {
            title: "XII - BIOLOGI",
            progress: 70,
            imgSrc: Picture, // Menggunakan SVG yang diimpor
        },
    ]);

    return (
        <div class="grid">
            <h1>Mata Pelajaran</h1>
            {cards().map((card) => (
                <Card
                    title={card.title}
                    progress={card.progress}
                    imgSrc={card.imgSrc}
                />
            ))}
        </div>
    );
}

export default App;