import "./Homepage.css";
import { useEffect } from "react";

export function Homepage() {

    useEffect(() => {
        document.body.classList.add("homepage-body");
        return () => {
            document.body.classList.remove("homepage-body");
        };
    }, []);

    return (
        <div className="homepage-modal">
            <div>
                Sip consciously
            </div>
            <div>
                Live gently
            </div>
            <div>
                Grow with us
            </div>
        </div>
    );
}