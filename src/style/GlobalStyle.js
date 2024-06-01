import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
html{
    scroll-bar : smooth;
}
body{
  background: #F5F7F8;
margin-bottom: 40px;
}
    *{
        font-family: "Montserrat";
        ::-webkit-scrollbar {
        width: 2px;
        }

/* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
    }    
    .container{
        max-width:1440px !important;
    }

    .form-control{
        padding: 12px 20px;
        border-radius: 10px;
        color: ${colors.dark};

        &:hover, &:active, &:focus{
            box-shadow: none;
        }
    }
    .nav-link{
         width: 200px;
         padding: 12px 20px;
         border-radius: 10px;
         box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-weight: 600;
         font-size: 20px;
        color : black !important;
        text-decoration : none;
        text-align : center;
    }

    .styledBtn {
      background: #FFA300;
      border-radius: .5rem;
      box-sizing: border-box;
      color: #FFFFFF;
      text-align: center;
      font-size: 16px;
      padding: 12px 20px;
      text-decoration: none;
      border: 0;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }
    
    
    @media (min-width: 768px) {
      .styledBtn {
        padding: 12px 20px;
      }
    }

    // .styledBtn{
        
    //    padding: 10px 20px;
    //    border-radius: 10px;
    //    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    //     border: none;
    //     outline: none;

    //    font-weight: 600;
    //    font-size: 20px;
    //     background: #FFEC00;
    //     color : black !important;
    //     text-decoration : none;
    // }
    
    .active{
        background: #D61216;
        color: #fff !important;
    }
    .orders td, .orders th {
        text-align: center;
        vertical-align: middle;
    }
    .category-title{
      span{
        border-bottom: 3px solid #FFA300;
        display: inline-block !important;
        padding: 0 6px;
      }

    }

`;

export default GlobalStyle;
