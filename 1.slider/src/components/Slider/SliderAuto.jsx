import React, { useEffect, useState } from "react";
import leftChevron from "../../assets/left-arrow.svg";
import rightChevron from "../../assets/right-arrow.svg";
import "./Slider.css";
import sliderData from "../../data/sliderData";

const Slider = () => {
    const [sliderIndex, setSlideIndex] = useState(1);

    const toggleImage = (indexPayLoad) => {
        //     let newState;
        //     if (indexPayLoad + sliderIndex > sliderData.length) {
        //         newState = 1;
        //     } else if (indexPayLoad + sliderIndex < 1) {
        //         newState = sliderData.length;
        //     } else {
        //         newState = indexPayLoad + sliderIndex;
        //     }
        //     setSlideIndex(newState);
        // };

        // // Utilisation d'un effet pour le slide automatique
        // useEffect(() => {
        //     const interval = setInterval(() => {
        //         toggleImage(1); // Passe à l'image suivante automatiquement
        //     }, 3000); // Change toutes les 3 secondes

        //     // Nettoyage de l'intervalle lorsque le composant est démonté
        //     return () => clearInterval(interval);
        // }, [sliderIndex]); // Dépendance sur sliderIndex pour mettre à jour correctement

        setSlideIndex((state) => {
            if (indexPayLoad + state > sliderData.length) {
                return 1;
            } else if (indexPayLoad + state < 1) {
                return sliderData.length;
            } else {
                return state + indexPayLoad;
            }
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => toggleImage(1), 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <p className="index-info">
                {sliderIndex} / {sliderData.length}
            </p>
            <div className="slider">
                <p className="image-info">
                    {
                        sliderData.find((obj) => obj.id === sliderIndex)
                            .description
                    }
                </p>
                <img
                    src={`/images/img-${sliderIndex}.jpg`}
                    alt="estate's rooms"
                    className="slider-img"
                />

                <button
                    onClick={() => toggleImage(-1)}
                    className="navigation-button prev-button"
                >
                    <img src={leftChevron} alt="previous image" />
                </button>
                <button
                    onClick={() => toggleImage(1)}
                    className="navigation-button next-button"
                >
                    <img src={rightChevron} alt="next image" />
                </button>
            </div>
        </>
    );
};

export default Slider;
