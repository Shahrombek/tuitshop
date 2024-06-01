import styled from "styled-components";

const HeaderWrapper = styled.header`
  padding: 20px;
  background: #fff1;
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: 2px solid #FFA300;
  .row {
    display: flex;
    align-items: center;
  }
  input {
    width: 100%;
  }
  @media (max-width: 768px) {
    .search-form {
      display: none;
    }
  }
`;

export default HeaderWrapper;
