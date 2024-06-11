import React, { useEffect, useRef, useState } from 'react'
import style from './SlidersHome.module.scss'
import { data } from '../../utils/slider_data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "../../axios/axios";

const SlidersHome = () => {
    const listRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliders, setSliders] = useState()

    useEffect(() => {
        const getSliders = async () => {
            try {
                const { data } = await axios.get('/getItemSlider')
                setSliders(data.items)
            } catch (e) {
                console.log(e)
            }
        }
        getSliders()
    }, [])

    useEffect(() => {
        const listNode = listRef.current;
        const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

        if (imgNode) {
            imgNode.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
        }

    }, [currentIndex]);

    const scrollToImage = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex(curr => {
                const isFirstSlide = currentIndex === 0;
                return isFirstSlide ? 0 : curr - 1;
            })
        } else {
            const isLastSlide = currentIndex === data.length - 1;
            if (!isLastSlide) {
                setCurrentIndex(curr => curr + 1);
            } else {
                setCurrentIndex(0)
            }
        }
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    return (
        <>
            <div className={style.responsibleDivs}>
                <div className={style.topItem}>
                    <div className={style.item}>
                        <img src='https://i.ibb.co/HFYDkgP/salyt2.png' alt='item' />
                        <div className={style.information}>
                            <h1>СУПЕР САЛЮТЫ</h1>
                            <p>ОТ 10 000 ₽</p>
                        </div>
                    </div>
                    <div className={style.item}>
                        <img src='https://i.ibb.co/y6jsFLJ/36zalp.png' className={style.smaller} alt='item' />
                        <div className={style.information}>
                            <h1>БОЛЬШИЕ САЛЮТЫ</h1>
                            <p>ОТ 3 000 ДО 10 000 ₽</p>
                        </div>
                    </div>
                </div>
                <div className={style.topItem}>
                    <div className={style.item}>
                        <img src='https://i.ibb.co/XFDggb5/mini-Salyt.png' className={style.smaller} alt='item' />
                        <div className={style.information}>
                            <h1>МАЛЫЕ САЛЮТЫ</h1>
                            <p>ДО 3 000 ₽</p>
                        </div>
                    </div>
                    <div className={style.item}>
                        <img src='https://i.ibb.co/3d3ggXp/image.png' style={{ height: "100px" }} alt='item' />
                        <div className={style.information}>
                            <h1 style={{ fontSize: "12px" }}>МЕЛКАЯ ПИРОТЕХНИКА</h1>
                            <p>Фонтаны, петарды и т.д.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.globalDivSliders}>
                <div className={style.wrapper}>
                    <div className="main-container">
                        <div className="slider-container">
                            <div className='leftArrow' onClick={() => scrollToImage('prev')}>
                                <FontAwesomeIcon icon={faChevronLeft} className={style.svgRight} />
                            </div>
                            <div className='rightArrow' onClick={() => scrollToImage('next')}>
                                <FontAwesomeIcon icon={faChevronRight} className={style.svgRight} />
                            </div>
                            <div className="container-images">
                                <div className="list-container" ref={listRef}>
                                    <ul className={"ul"}>
                                        {sliders?.map((item, index) => (
                                            <li key={index} className={"li"}>
                                                <img src={`http://localhost:4000/internal/uploads/${item.img}`}
                                                    alt={'/'} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="dots-wrapp">
                            <div className="dots-container">
                                {
                                    sliders?.map((_, idx) => (
                                        <div key={idx}
                                            className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                                            onClick={() => goToSlide(idx)}>
                                        </div>))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.someFireworks}>
                    <div className={style.firstBlock}>
                        <img className={style.img}
                            src="https://i.1.creatium.io/disk2/a0/ee/3b/1ee1f394a66249f4871ccc2f8d08e36fa1/585x365q8/akciya_skidka_20_v_slayder.png"
                            alt="/" />
                        <img className={style.img}
                            src="https://i.1.creatium.io/disk2/a0/ee/3b/1ee1f394a66249f4871ccc2f8d08e36fa1/585x365q8/akciya_skidka_20_v_slayder.png"
                            alt="/" />
                    </div>
                    <div className={style.secondBlock}>
                        <img className={style.img}
                            src="https://i.1.creatium.io/disk2/a0/ee/3b/1ee1f394a66249f4871ccc2f8d08e36fa1/585x365q8/akciya_skidka_20_v_slayder.png"
                            alt="/" />
                        <img className={style.img}
                            src="https://i.1.creatium.io/disk2/a0/ee/3b/1ee1f394a66249f4871ccc2f8d08e36fa1/585x365q8/akciya_skidka_20_v_slayder.png"
                            alt="/" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SlidersHome