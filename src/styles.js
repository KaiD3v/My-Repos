import { styled, keyframes, css } from "styled-components"

export const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    padding: 30px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    margin: 80px auto;


    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
    }
`

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    input {
        flex: 1;
        border: 1px solid #DDD;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`

// button animation
const animate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background: #0D2636;
    border: none;
    border-radius: 4px;
    margin-left: 10px;
    padding:0 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;


    &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;

    ${props => props.loading &&
        css`
         svg{
            animation: ${animate} 2s linear infinite;
         }
         `

    }
}`;