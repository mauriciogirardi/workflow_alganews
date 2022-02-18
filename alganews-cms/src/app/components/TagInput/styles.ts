import styled from "styled-components";

export const Wrapper = styled.div`
    .ReactTags__selected {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .ReactTags__tag {
        background-color: #09f;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        display: flex;
        align-items: center;
    }

    .ReactTags__remove {
        width: 10px;
        height: 1em;
        border: 0;
        color: #fff;
        background-color: transparent;
        cursor: pointer;
        font-size: 1em;
        margin-left: 5px;
        transition: color 0.2s;

        &:hover {
            color: #ed6a6a;
        }
    }

    .ReactTags__tagInput {
        flex-grow: 1;
    }

    .ReactTags__tagInputField {
        color: #274060;
        background-color: transparent;
        border-radius: 0;
        width: 100%;
        padding: 4px 0;
        font-size: 1em;
        font-size: 'Lato', sans-serif;
        border: 0;
        border-bottom: 1px solid #ccc;
        outline: 0;
    }
`
