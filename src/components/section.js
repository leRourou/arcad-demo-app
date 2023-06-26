import React from "react";
import { useTransition } from "@react-spring/web";
import { animated } from "@react-spring/web";

export default function Section(props) {
    const { title, children, closeAll, isOpen, setIsOpen } = props;

    const TRANSITION_PROPERTIES = {
        from: { maxHeight: 0 },
        enter: { maxHeight: 250},
        leave: { maxHeight: 0 },
    }

    const transition = useTransition(isOpen, TRANSITION_PROPERTIES);

    return (
        <section className="section">
            <h2 onClick={() => {
                closeAll();
                setIsOpen(!isOpen);
            }} className="subtitle-itemview">{title} {isOpen ? "⯆" : "⯈"}</h2>
            {transition((style, item) => item && (
                <animated.div style={style}>
                    {children}
                </animated.div>
            ))}
        </section>
    )
}