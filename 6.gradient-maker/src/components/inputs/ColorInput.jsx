import React from "react";
import { useDispatch } from "react-redux";
import { updateColorValue } from "../../features/gradient";

const ColorInput = ({ id, color }) => {
    const dispatch = useDispatch();

    return (
        <input
            onChange={(e) =>
                dispatch(
                    updateColorValue({
                        id,
                        value: e.target.value,
                        type: "color",
                    })
                )
            }
            value={color}
            type="color"
            className="w-[60px] h-[60px] bg-transparent rounded-md cursor-pointer d-block [&:not(:last-child)]:mr-4"
        ></input>
    );
};

export default ColorInput;
