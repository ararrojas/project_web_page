import "./Homepage.css";
import { useEffect, useState } from "react";

export function About() {
    useEffect(() => {
        document.body.classList.add("homepage-body");
        return () => {
            document.body.classList.remove("homepage-body");
        };
    }, []);

    return (
        <div className="toast">
            <div>At BackToSoil, we believe every cup has a story, one that begins in the soil, flows through your hands, and ultimately returns gently to the earth. Our mission is simple: craft exceptional teas while honoring the planet that grows them.
                <br />We partner with small, sustainable farms around the world who cultivate tea through regenerative practices, ensuring biodiversity, fair work conditions, and a harvest that nurtures the land instead of exhausting it. Every blend we create is sourced responsibly, hand‑picked with care, and designed to give you a richer, more conscious tea experience.
                Inspired by circularity leaders in the food‑tech space, we follow a model where nothing goes to waste.
                <br />Our tea leaves are fully biodegradable, our sachets are compost‑ready, and even our packaging is made with recycled, plant‑based materials. After steeping your tea, the spent leaves can be returned to the soil as a natural fertilizer — completing a cycle that enriches the earth rather than adding to its burden.
                We envision a world where simple daily rituals restore balance. Where every sip is a vote for sustainability. And where a cup of tea doesn’t just warm your hands — it nourishes the planet.
                <br />Welcome to a new kind of tea company.
                <br />One rooted in nature, shaped by innovation, and guided by purpose.
            </div>
        </div>
    );
}