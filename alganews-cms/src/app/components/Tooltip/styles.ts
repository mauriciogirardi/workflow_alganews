import styled from "styled-components";

export const TooltipText = styled.div`
  color: #fff;
  text-align: center;
  cursor: pointer;
`;

export const TooltipBox = styled.div<{
    topBox?: string
    leftBox?: string
    bottomBox?: string
    rightBox?: string
    topArrow?: string
    leftArrow?: string
    rotateArrow?: number
}>`
  position: absolute;
  top: calc(100% + 10px);
  left: ${props => props.leftBox ? props.leftBox : '0'}px;
  right: ${props => props.rightBox ? props.rightBox : '0'}px;
  top: ${props => props.topBox ? props.topBox : '30'}px;
  bottom: ${props => props.bottomBox ? props.bottomBox : '-40'}px;
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  width: 120px;
  border-radius: 4px;
  z-index: 10000;
  text-align: center;

  transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s,
    padding 0.5s ease-in-out;

  &:before {
    content: "";
    width: 0;
    height: 0;
    left: ${props => props.leftArrow ? props.leftArrow : '28'}px;
    top: ${props => props.topArrow ? props.topArrow : '-10'}px;
    position: absolute;

    border: 10px solid transparent;
    transform:${props => props.rotateArrow ? `rotate(${props.rotateArrow}deg)` : 'rotate(135deg)'};
    transition: border 0.5s ease-in-out;
  }
`;

export const TooltipCard = styled.div<{
    w?: string
}>`
  position: relative;
  & ${TooltipText}:hover + ${TooltipBox} {
    visibility: visible;
    color: #fff;
    background-color: #0099FF;
    padding: 8px 8px;
    width: ${props => props.w ? `${props.w}px` : '100px'};
    &:before {
      border-color: transparent transparent rgb(0, 153, 255) rgb(0, 153, 255);
    }
  }
`;
