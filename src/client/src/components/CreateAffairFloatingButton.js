import React, { useState } from 'react';
import { useRecoilValue, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import AffairCreatePopup from "./AffairCreatePopup";
import { DateTime } from "luxon";

function CreateAffairFloatingButton() {
    const currentUser = useRecoilValue(CurrentUserAtom);

    const [showPopup, setShowPopup] = useState(false);

    if (!currentUser || !currentUser.id) {
        return null;
    }

    return (
        <>
            <div className={"createAffairFloater glowing"} onClick={() => setShowPopup(true)}>
                <div>+</div>
            </div>

            {showPopup && <AffairCreatePopup defaultStart={DateTime.now()}
                                             close={() => setShowPopup(false)} />}
        </>
    );
}

export default CreateAffairFloatingButton;
