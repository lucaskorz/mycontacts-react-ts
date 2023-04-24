import styled from 'styled-components'

export const Container = styled.header<{ justifyContent: string }>`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};

  strong {
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;