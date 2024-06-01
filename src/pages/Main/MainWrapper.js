import styled from "styled-components";
import bannerImage from "../../assets/banner.png";

const Wrapper = styled.div`
  .category {
    text-align: left;
    font-weight: 600;
    font-size: 38px;
    margin-bottom: 35px;
  }
  main {
    position: relative;
    background-image: url("${bannerImage}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 80vh;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 10vw;

    &>span.h1 {
      z-index: 1;
      font-size: 48px;
      color: #ffa300;
      font-weight: 700;
      line-height: 72.79px;
      margin-bottom: 12px;
    }
    &>p{
     z-index: 1;
      text-align: left;
      color: #eee;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 48px;
    }
    &>button{
      z-index: 1;
      a{
        text-decoration: none;
        color: white;
        font-weight: 500;
        font-size: 16px;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: #141414cc;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .tabBtn {
    background: rgb(240, 240, 240);
    width: 100%;
    display: inline-block;
    padding: 10px;
    border-radius: 10px;
    transition: background 0.25s ease-in 0s;
    text-decoration: none;
    color: black;
    &:hover {
      background: #ffa300;
      color: white !important;
    }
  }
`;

export default Wrapper;
