import React from "react";
import './App.css';

export default function Home() {
    return (
        <div className="homepage">
            <div className="home_container">
                <div className="welcome">Bine ati venit la Fleet Manager, aplicatia de management a flotei dumneavoastra. Aceasta tehnologie va permite sa gestionati judicios flota dumneavoastra de autovehicule cu urmatoarele beneficii:
                    <ul>
                        <li>costuri reduse de intretinere</li>
                        <li>vedere de ansamblu cu toate datele actualizate</li>
                        <li>planificare mai buna a curselor efectuate</li>
                        <li>repartitia rulajului in mod judicios intre autovehicule</li>
                        <li>cunoasterea in orice moment a statutului autovehiculelor</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}