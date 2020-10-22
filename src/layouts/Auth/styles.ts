import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  background: ${({ theme }) => theme.colors.background};

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

export const Content = styled.main`
  margin-top: 60px;
  border-radius: 8px;
  width: 100%;
  max-width: 415px;
  min-height: 200px;
  padding: 24px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: all 0.4s linear !important;

  overflow: hidden;
`;
